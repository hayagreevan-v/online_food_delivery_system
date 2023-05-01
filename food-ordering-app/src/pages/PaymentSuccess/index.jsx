import { Alert } from "../../components/elements/Alert";
const PaymentSuccess = () => {
    return (
        <div className="max-w-lg mx-auto p-4">
            <Alert variant="success">
                Your Order placed successfully. It will reach you within a hour
            </Alert>
        </div>
    )
}

export default PaymentSuccess;