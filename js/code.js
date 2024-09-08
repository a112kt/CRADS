productName = document.getElementById("ProductName")
productPrice = document.getElementById("ProductPrice")
productCategory = document.getElementById("ProductCategory")
productDes = document.getElementById("ProductDes")
addUpdateBtn=document.getElementById("addUpdateBtn")
inputSearch = document.getElementById("inputSearch")
nameValidation=document.getElementById("nameValidation")
priceValidation=document.getElementById("priceValidation")
cateValidation=document.getElementById("cateValidation")
descValidation=document.getElementById("descValidation")

var mainIndex;
var productArr =JSON.parse(localStorage.getItem("Products"))?? [];
display()

function addProduct(){
    validateProduct()
   
    
    var product = {
        Name : productName.value,
        price : productPrice.value,
        cate: productCategory.value,
        desc :productDes.value
    }
    if( validationInput()){
        if(addUpdateBtn.innerHTML=="Update product"){
            productArr.splice(mainIndex,1,product)
            addUpdateBtn.innerHTML="Add Product"
            ClearInput()
        }
        else{
            productArr.push(product)
            ClearInput()
    
        }
       

    }

       
       
    onChange()
   
    
}

function display(){
    var box = "" 
    for(var i = 0 ; i < productArr.length ; i++){
        box += `
                <tr>
                    <td>${i}</td>
                    <td>${productArr[i].Name}</td>
                    <td>${productArr[i].price}</td>
                    <td>${productArr[i].cate}</td>
                    <td>${productArr[i].desc}</td>
                    <td><button class="btn" id="btn1" onclick="Delete(${i})"><i class="fa-solid fa-trash text-danger"></i> Delete</button></td>
                    <td><button class="btn" onclick="patchValue(${i})" id="btn2"><i class="fa-solid fa-square-pen text-info"></i> Update</button></td>
                </tr>

    `

    }

    document.getElementById("tbody").innerHTML = box;
}

function ClearInput(){
    productName.value="";
    productPrice.value="";
    productCategory.value ="";
    productDes.value = "";

}
function onChange(){
    localStorage.setItem("Products",JSON.stringify(productArr))
    display()
    
 
}

function Delete(index){
    productArr.splice(index,1)
    onChange()
    

}
function patchValue(index){
    mainIndex = index;

    productName.value=productArr[index].Name
    productPrice.value=productArr[index].price
    productCategory.value=productArr[index].cate
    productDes.value=productArr[index].desc

    addUpdateBtn.innerHTML = `Update product`
   

}
function search(){
   var searchTerm = inputSearch.value;
   var box = "" 
   for(var i = 0 ; i < productArr.length ; i++){
    if(productArr[i].Name.toLowerCase().includes(searchTerm.toLowerCase())){
        box += `
               <tr>
                   <td>${i}</td>
                   <td>${productArr[i].Name}</td>
                   <td>${productArr[i].price}</td>
                   <td>${productArr[i].cate}</td>
                   <td>${productArr[i].desc}</td>
                   <td><button class="btn" id="btn1" onclick="Delete(${i})"><i class="fa-solid fa-trash text-danger"></i> Delete</button></td>
                   <td><button class="btn" onclick="patchValue(${i})" id="btn2"><i class="fa-solid fa-square-pen text-info"></i> Update</button></td>
               </tr>

   `
   
    }
       

   }
   document.getElementById("tbody").innerHTML = box;

    
}
function validationInput(){
    return(/^[A-Z][\w]{2,20}$/.test(productName.value) &&
    /^[1-9][0-9]+$/.test(productPrice.value)&&
    /^[A-Z][\w]{2,}$/.test(productCategory.value)&&
    /^[A-Z][\w]{2,}$/.test(productDes.value))

          

}
function validateProduct(){
   if(/^[A-Z][\w ]{2,20}$/.test(productName.value)){
        nameValidation.classList.add("d-none")
        
    }else{
        nameValidation.classList.remove("d-none")
       
    }



    if(/^[1-9][0-9]+$/.test(productPrice.value)){
        priceValidation.classList.add("d-none")
 
    }else{
        priceValidation.classList.remove("d-none")
      
    }


    if(/^[A-Z][\w]{2,}$/.test(productCategory.value)){
        cateValidation.classList.add("d-none")
       
    }else{
        cateValidation.classList.remove("d-none")
       
    }


    if(/^[A-Z][\w]{2,}.$/.test(productDes.value)){
        descValidation.classList.add("d-none")
       
       
    }else{
        descValidation.classList.remove("d-none")
        
    }

}