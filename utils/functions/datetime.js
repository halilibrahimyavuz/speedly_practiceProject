
import moment from "moment"

// TARİH VE  SAATİ  istediğimiz formata cevırdık ve bunun uzerınden oncem sonramı dıye kontrol eetmek ııcnn bu methodu kullandık

const formatdateTime =(date ,time)=>{
    const dateStr = moment(date ,  "YYYY-MM-DD").format("YYYY-MM-DD"); // saat kısmını silmek ıcın
    
    return moment(`${dateStr} ${time}` , "YYYY-MM-DD HH:mm").format("MM/DD/YYYY HH:mm:ss") // saat tarıh bırleestı ve dıledıgımız formata geldı
}

export default formatdateTime;