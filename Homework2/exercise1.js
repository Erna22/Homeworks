
//  Exercise 1

    let addedItems = [];
    let htmlCode = "";
    let buyItemHtml = "";

    function onAdd() {
        addedItems.push(
           {
               'productName' : document.getElementById("productName").value,
               'productDescription' : document.getElementById("productDescription").value,
               'productFile' : document.getElementById("img").src,
               'productPrice' : document.getElementById("productPrice").value,
               'customerFirstName' : document.getElementById("customerFirstName").value,
               'customerLastName' : document.getElementById("customerLastName").value,
               'addedToChart' : false,
               'quantity': 1,
               'index': parseInt(addedItems.length)
           }
       );

        htmlCode += "<div class='product'>"+
            "<img src='"+document.getElementById("img").src+"' />"+
            "<p>"+document.getElementById("productDescription").value+"</p>"+
            "<p>$"+document.getElementById("productPrice").value+"</p>"+
            "<button class='details-button' onclick='openModal("+parseInt(addedItems.length-1)+");return false;'>Details</button>"+
            "<button class='buy-button' onclick='buyItem("+parseInt(addedItems.length-1)+");return false;'>Buy</button>"+
            "</div>";

        document.getElementById("htmlText").innerHTML = htmlCode;

    }


    function previewFile(){
        let preview = document.querySelector('img');
        let file    = document.querySelector('input[type=file]').files[0];
        let reader  = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }

    let itemsToBuyArray = [];

    // on click "Buy" button add item to itemsToBuyArray; Change Html for 3rd section
    function buyItem(index) {

        let isInArray = findIndexInArray(index);
        if(isInArray.length && itemsToBuyArray.length){
            alert('Proizvod je vec dodat u stavke za kupovinu.');
            return;
        }

        itemsToBuyArray.push(addedItems[index]);

        buyItemHtml += '<div class="shopping-cart-product">'+
            '<div class="product-info">'+
            '<div>'+
            '<h3>'+addedItems[index].productName+'</h3>'+
            '<p>$'+addedItems[index].productPrice+' &times; 1</p>'+
            '</div>'+
            '<img src="'+addedItems[index].productFile+'" />'+
            '</div>'+
            '<div class="product-count">'+
            '<button onclick="onQuantityMinus('+index+');return false;">-</button>'+
            '<span>1</span>'+
            '<button onclick="onQuantityPlus('+index+');return false;">+</button>'+
            '</div>'+
            '</div>';

        calculateSum();
        document.getElementById("buyItemHtml").innerHTML = buyItemHtml;
    }

    // check if item is in array and if is, return that item
    function findIndexInArray(index) {
        return itemsToBuyArray.filter(elem => elem.index === index);

    }

    // decrement quantity of selected product
    function onQuantityMinus(index){
        if(addedItems[index].quantity === 1){
            let item = findIndexInArray(index);
            var foundIndex = itemsToBuyArray.findIndex(x => x.index == item[0].index);
            itemsToBuyArray.splice(foundIndex, 1);
        }
        else{
            addedItems[index].quantity--;
        }
        calculateSum();
        resetHtmlOfItemsToBuy();
    }

    // increment quantity of selected product
    function onQuantityPlus(index){
        let item = findIndexInArray(index);
        if(item[0].quantity === 10){
            alert('Unijeli ste maksimalnu kolicinu za proizvod.');
            return;
        }
        else{
            item[0].quantity++;
            var foundIndex = itemsToBuyArray.findIndex(x => x.index == item[0].index);
            itemsToBuyArray[foundIndex] = item[0];

            calculateSum();
            resetHtmlOfItemsToBuy();
        }
    }

    // calculate Total for selected products
    function calculateSum() {
        let sum = 0;
        if(itemsToBuyArray.length){
            for (let i=0; i<itemsToBuyArray.length; i++){
                sum += parseInt(itemsToBuyArray[i].quantity) * parseFloat(itemsToBuyArray[i].productPrice);
            }
        }
        document.getElementById("total").innerHTML = sum;
    }

    // regenerate HTML for selected items
    function resetHtmlOfItemsToBuy() {
        buyItemHtml = '';
        for(let i=0; i<itemsToBuyArray.length; i++){
            buyItemHtml += '<div class="shopping-cart-product">'+
                '<div class="product-info">'+
                '<div>'+
                '<h3>'+itemsToBuyArray[i].productName+'</h3>'+
                '<p>$'+itemsToBuyArray[i].productPrice+' &times; '+itemsToBuyArray[i].quantity+'</p>'+
                '</div>'+
                '<img src="'+itemsToBuyArray[i].productFile+'" />'+
                '</div>'+
                '<div class="product-count">'+
                '<button onclick="onQuantityMinus('+itemsToBuyArray[i].index+');return false;">-</button>'+
                '<span>'+itemsToBuyArray[i].quantity+'</span>'+
                '<button onclick="onQuantityPlus('+itemsToBuyArray[i].index+');return false;">+</button>'+
                '</div>'+
                '</div>';
        }

        document.getElementById("buyItemHtml").innerHTML = buyItemHtml;
    }

    // Purchase order
    function purchase() {
        modal.style.display = "block";

        var modalHtml = "<div class='product'>"+
            "<h3>Congratulations!</h3>"+
            "<h6>Order Complete! </h6>"+
            "</div>";


        document.getElementById("modalHtml").innerHTML = modalHtml;
        document.getElementById("modal-title").innerHTML = "Thank you for your order!";
    }



    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    function openModal(index) {

        modal.style.display = "block";

        var modalHtml = "<div class='product'>"+
            "<p>"+addedItems[index].productName+"</p>"+
            "<img src='"+addedItems[index].productFile+"' />"+
            "<p>$"+addedItems[index].productDescription+"</p>"+
            "</div>";

        document.getElementById("modalHtml").innerHTML = modalHtml;
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
