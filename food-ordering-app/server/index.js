const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require('./db');

const app = express();
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/productRouter');

const Order = require('./models/orderModel');
const Post = require("./models/post.model.js");
const env = require('dotenv').config({path: '../.env'});

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var corsOptions = {
    origin: "http://localhost:3000"
}

const calculateOrderAmount = (orderItems) => {
    const initialValue = 0;
    const itemsPrice = orderItems.reduce(
        (previousValue, currentValue) =>
        previousValue + currentValue.price * currentValue.amount, initialValue
    );
    return itemsPrice * 100;
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb',extended: true}));

app.use(cors(corsOptions));
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard
// https://dashboard.stripe.com/test/webhooks
app.post('/webhook', async (req, res) => {
    let data, eventType;
  
    // Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }
      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // we can retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    }
  
    if (eventType === 'payment_intent.succeeded') {
      // Funds have been captured
      // Fulfill any orders, e-mail receipts, etc
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log('💰 Payment captured!');
    } else if (eventType === 'payment_intent.payment_failed') {
      console.log('❌ Payment failed.');
    }
    res.sendStatus(200);
  });

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get("/", (req, res) => {
  try{
    res.json({ message: "Welcome to Food Ordering"});
    Post.find({}).then(data=>{
      res.json(data)
  }).catch(error=>{
      res.status(408).json({error})
  })
}
catch(error){
    res.json({error})
}
});

/**Post: https://localhost:3001/feedback */
app.post("/feedback",async(req,res)=>{
  //const body=req.body;
  const { name, review, myfile } = req.body;
  //console.log(req.body);
  try{
      //const newImage=await Post.create(body)
      //newImage.save().then().catch(e => console.log(e));
      //const newPost = await Post.create({ name, review, myfile });
      const newPost = await Post.create({ name, review, myfile });
      newPost.save().then().catch(e => console.log(e));
      res.status(201).json({msg:"New image uploaded...!"});
  }
  catch(error){
      console.log(error);
      res.status(409).json({message: error.message});
  }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use('/api/', productRouter);
app.use('/api/', userRouter);

app.post('/create-payment-intent', async(req, res) => {
    try {
        const { orderItems, shippingAddress, userId } = req.body;
        console.log(shippingAddress);

        const totalPrice = calculateOrderAmount(orderItems);

        const taxPrice = 0;
        const shippingPrice = 0;

        const order = new Order({
            orderItems,
            shippingAddress,
            paymentMethod: 'stripe',
            totalPrice,
            taxPrice,
            shippingPrice,
            user: ''
        })

        // await order.save();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice,
            currency: 'usd'
        })

        res.send({
            clientSecret: paymentIntent.client_secret
        })
    } catch(e) {
        res.status(400).json({
            error: {
                message: e.message
            }
        })
    }
})