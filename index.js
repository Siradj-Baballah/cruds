
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

// *************

let title = document.getElementById('title');
let price = document.getElementById('price')
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads')
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let total = document.getElementById('total');
let submit = document.getElementById('submit');
let tmp;
let mood = 'create'
// get total

function getTotal () {
  if(price.value != ''){
    let result = (+price.value  + +taxes.value + +ads.value) - +discount.value;
      total.innerHTML = result;
      total.style.backgroundColor = '#D1512D';
  }else{
    total.innerHTML = ''
    total.style.backgroundColor = '#7858A6';
  }
}

// Create PRODUCT

let dataProduct;
if(localStorage.product != null){
  dataProduct = JSON.parse(localStorage.product)
}else{
  dataProduct = [];
}

submit.onclick = function(){
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.textContent,
    count: count.value,
    category: category.value.toLowerCase(),
  }
  if(newPro.title != '' && newPro.price != '' && newPro.category != '' &&  newPro.count <= 100){
    if( mood === 'create'){
        if(newPro.count > 1){
          for(let i = 0; i < newPro.count; i++){
            dataProduct.push(newPro);
          }
        }else {
          dataProduct.push(newPro);
        }
    }else{
        dataProduct[tmp] = newPro;
        mood = 'create'
        count.style.display = 'block';
        submit.innerHTML = 'Create';
        submit.classList.remove("btn2")

    }
    clearData();
  }
  localStorage.setItem('product', JSON.stringify(dataProduct));
  showData();
}

// clean inputs

function clearData(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  count.value = '';
  category.value = '';
  total.innerHTML = '';
  total.style.backgroundColor = '#7858A6';
}

// read

function showData(){
  let table = '';
  for(let i=0 ; i < dataProduct.length ; i++){
    if(dataProduct[i].taxes == ''){dataProduct[i].taxes = '-';}
    if(dataProduct[i].ads == ''){dataProduct[i].ads = '-';}
    if(dataProduct[i].discount == ''){dataProduct[i].discount = '-';}
    table += `
    <tr>
      <td>${i+1}</td>
      <td style="color:#D1512D ; font-size: 20px; font-weight: 700;">${dataProduct[i].title.toProperCase()}</td>
      <td>${dataProduct[i].price}</td>
      <td class="td">${dataProduct[i].taxes}</td>
      <td class="td">${dataProduct[i].ads}</td>
      <td class="td">${dataProduct[i].discount}</td>
      <td>${dataProduct[i].total}</td>
      <td>${dataProduct[i].category.toProperCase()}</td>
      <td> <button onclick="updateData(${i})" id="update" class="btn2"> Update </button></td>
      <td> <button onclick="deleteData(${i})" id="update" class="btn"> Delete </button></td>
    </tr>
    `
  }
  document.getElementById('tbody').innerHTML = table;
  let btnDelete = document.getElementById("deleteAll")
  if(dataProduct.length > 0){
    btnDelete.innerHTML = `
      <button onclick='deleteAll()' class='btn'> Delete All (${dataProduct.length}) </button>
    `
  }else{
    btnDelete.innerHTML = ''
  }
}
showData();

// delete
function deleteData(i){
  dataProduct.splice(i,1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

// delete All
function deleteAll(){
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

// update

function updateData(i){
  mood = "update"
  if(dataProduct[i].taxes == '-'){dataProduct[i].taxes = '';}
  if(dataProduct[i].ads == '-'){dataProduct[i].ads = '';}
  if(dataProduct[i].discount == '-'){dataProduct[i].discount = '';}
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal();
  count.style.display = 'none';
  category.value = dataProduct[i].category;
  submit.innerHTML = 'Update';
  submit.classList.add("btn2")
  tmp = i;
  scroll({
    top:0,
    behavior:"smooth"
  })
}

// search

let searchMood = 'Title';
function getSearchMood(id)
{
  let search = document.getElementById('search')
  if(id == "searchTitle"){
    searchMood = 'Title';
  }else{
    searchMood = 'Catregory';
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = '';
  showData();
}

function searchData(value){
  let table = ''
  for(let i =0; i < dataProduct.length ; i++){
    if(searchMood == "Title") {
      if(dataProduct[i].title.includes(value)) {
          table += `
          <tr>
            <td>${i}</td>
            <td style="color:#D1512D ; font-size: 20px; font-weight: 700;">${dataProduct[i].title.toProperCase()}</td>
            <td>${dataProduct[i].price}</td>
            <td class="td">${dataProduct[i].taxes}</td>
            <td class="td">${dataProduct[i].ads}</td>
            <td class="td">${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category.toProperCase()}</td>
            <td> <button onclick="updateData(${i})" id="update" class="btn2"> Update </button></td>
            <td> <button onclick="deleteData(${i})" id="update" class="btn"> Delete </button></td>
          </tr>
          `
        }
    }else{
      if(dataProduct[i].category.includes(value)) {
          table += `
          <tr>
            <td>${i}</td>
            <td style="color:#D1512D ; font-size: 20px; font-weight: 700;">${dataProduct[i].title.toProperCase()}</td>
            <td>${dataProduct[i].price}</td>
            <td class="td">${dataProduct[i].taxes}</td>
            <td class="td">${dataProduct[i].ads}</td>
            <td class="td">${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category.toProperCase()}</td>
            <td> <button onclick="updateData(${i})" id="update" class="btn2"> Update </button></td>
            <td> <button onclick="deleteData(${i})" id="update" class="btn"> Delete </button></td>
          </tr>
          `
        }
      }
  }
  document.getElementById('tbody').innerHTML = table;
}
