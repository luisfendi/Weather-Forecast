export function show(name){
    console.log(name + 'fdkfmdkfd')
}
export function removeFromLS(name){
    console.log('------remove--------')
         if(!localStorage.getItem('citiesList')){
             return
         }
         else {
             let arr = JSON.parse(localStorage.getItem('citiesList'));
             let i = arr.indexOf(name);
             arr.splice(i, 1);
             localStorage.setItem('citiesList', JSON.stringify(arr))
         }
}

export function addToLS(name){
    console.log('------add--------') 
         if(!localStorage.getItem('citiesList')){
             let arr = [];
             arr.push(name);
             localStorage.setItem('citiesList', JSON.stringify(arr));
         }
         else {
             console.log("suki")
            let arr = JSON.parse(localStorage.getItem('citiesList'));
            if(arr.indexOf(name) > -1){
                return;
            }
            else {
            arr.push(name);
                    localStorage.setItem('citiesList', JSON.stringify(arr))
                 }
            }  
     }

export function prove (liked, name){
    if(JSON.parse(localStorage.getItem('citiesList'))){
    liked =  JSON.parse(localStorage.getItem('citiesList')).indexOf(name) > -1

    }
    else {
        return
    }
    console.log('+++++prove+++++' + liked + ' ' + name)

}