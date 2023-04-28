export const TabItem=({title,index,active,setActive})=>{
    const className=active?'border-b-yellow-400':'border-none text-slate-400'

    return(
        <div className="nav-item px-2">
        <a href={"{#{title}}"}>
            <button onClick={()=>setActive(title)} className="pt-7 pb-3">
              {title.toUpperCase()}
            </button>
        </a>
        </div>
    )
}