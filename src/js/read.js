 
import {ref as dataRef, get, set, update} from 'firebase/database';
import {db} from './libs/firebase/firebaseConfig';
import {rentalCard} from './templates/rentalCard'

async function pageInit(){
    const rentalRef = dataRef(db, 'rentals/');
    const rentalSnapShot = await get(rentalRef)
    const data = rentalSnapShot.val();
   
    // Object of Objects  rental{{},{},{}}
    // Arrays of Objects
    // map filter reduce sort find ....
    // Object.keys()  Object.enteries() Object.values();

    const rentalCards =   Object.values(data).map(rental=>{
            const card = rentalCard(rental)
            // layout thrashing
            document.body.append(card)
            return card
      })
      
      


    
}

pageInit()