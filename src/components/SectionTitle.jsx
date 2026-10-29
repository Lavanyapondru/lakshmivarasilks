export default function SectionTitle({eyebrow,title,text}){
 return <div className="section-title text-center mx-auto mb-5"><span>{eyebrow}</span><h2>{title}</h2>{text&&<p>{text}</p>}</div>
}