
const rank=document.querySelectorAll(".rank");
//alert(rank.length)
rank.forEach(function(num,key){
   //ata foreach loop t 1st paramater t tar value ahe mane ki ase aru 2nd parametert tar number tu ase 0,1,2 anhkoi
 // alert(key)
if(key==0){
//const two=document.querySelector(".two");
document.querySelector(".record").addEventListener("click",show);
function show(){
   // document.querySelector(".one").classList.add("magic");
   document.querySelector(".one").classList.toggle("magic");
}
}if(key==1){
   document.querySelector(".find").addEventListener("click",show);
   function show(){
      // document.querySelector(".one").classList.add("magic");
      document.querySelector(".three").classList.toggle("magic");
   }
   }

});

//calculation




// document.querySelector("#ullua").innerHTML=res 
   

const day= new Date();
const month=day.getMonth() +1;
const num=day.getDate();
const one=day.getDay();
const daysname=['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday']
switch (month) {
   case 1:
      if(num==31){
         document.getElementById('date').textContent='Records days since end of the Month';
      }else {
         document.getElementById('date').textContent=num+' January '+daysname[one];
         }
      break;
      case 2:
         if(num==28){
            document.getElementById('date').textContent='Records days since end of the Month';
         }else {
         document.getElementById('date').textContent=num+' February '+daysname[one];
         }
         break;
      case 3:
         if(num==31){
            document.getElementById('date').textContent='Records days since end of the Month';
         }else {
       document.getElementById('date').textContent=num+' March '+daysname[one];
      }
       break;
       case 4:
         if(num==30){
            document.getElementById('date').textContent='Records days since end of the Month';
         }else{
            document.getElementById('date').textContent=num+' April '+daysname[one];  
         }
       
         break;
         case 5:
            if(num==31){
               document.getElementById('date').textContent='Records days since end of the Month';
            }else {
            document.getElementById('date').textContent=num+' May '+daysname[one];
      }
            break; 
            case 6:
               if(num==30){
                  document.getElementById('date').textContent='Records days since end of the Month';
               }else {
               document.getElementById('date').textContent=num+' June '+daysname[one];
   }
               break;
               case 7:
                  if(num==31){
                     document.getElementById('date').textContent='Records days since end of the Month';
                  }else {
                  document.getElementById('date').textContent=num+' July '+daysname[one];
}
                  break; 
                  case 8:
                     if(num==31){
                        document.getElementById('date').textContent='Records days since end of the Month';
                     }else {
                     document.getElementById('date').textContent=num+' Austust '+daysname[one];
}
                     break; 
                     case 9:
                        if(num==30){
                           document.getElementById('date').textContent='Records days since end of the Month';
                        }else {
                        document.getElementById('date').textContent=num+' September '+daysname[one];
}
                        break; 
                        case 10:
                           if(num==31){
                              document.getElementById('date').textContent='Records days since end of the Month';
                           }else {
                           document.getElementById('date').textContent=num+' October '+daysname[one];
}
                           break;  
                           case 11:
                              if(num==30){
                                 document.getElementById('date').textContent='Records days since end of the Month';
                              }else {
                              document.getElementById('date').textContent=num+' November '+daysname[one];
}
                              break; 
                              case 12:
                                 if(num==31){
                                    document.getElementById('date').textContent=' It is last day of the year i hope you have achieved your all goals.';
                                 }else {
                                 document.getElementById('date').textContent=num+' December '+daysname[one];
}
                                 break; 

   default:
      break;
}
  


   












