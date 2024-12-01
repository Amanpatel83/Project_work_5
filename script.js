$(document).ready(function () {
    // Load existing data
    loadProducts();

    // Handle form submission
    $('#productForm').on('submit', function (e) {
        e.preventDefault();

        var productName = $('#productName').val();
        var quantity = $('#quantity').val();
        var price = $('#price').val();

        $.ajax({
            url: 'submit.php',
            type: 'POST',
            data: {
                productName: productName,
                quantity: quantity,
                price: price
            },
            success: function (response) {
                var data = JSON.parse(response);
                if (data.status === 'success') {
                    loadProducts();
                    $('#productForm')[0].reset();
                }
            }
        });
    });

    // Load products from JSON file and display them
    function loadProducts() {
        $.get('data/products.json', function (data) {
            var totalValue = 0;
            var rows = '';
            data.forEach(function (product) {
                var row = '<tr>';
                row += `<td>${product.productName}</td>`;
                row += `<td>${product.quantity}</td>`;
                row += `<td>${product.price}</td>`;
                row += `<td>${product.datetime}</td>`;
                row += `<td>${product.totalValue}</td>`;
                row += `<td><button class="btn btn-sm btn-warning editBtn" data-id="${product.datetime}">Edit</button></td>`;
                row += '</tr>';

                rows += row;
                totalValue += parseFloat(product.totalValue);
            });

            $('#productList').html(rows);
            $('#totalValue').text(totalValue.toFixed(2));
        });
    }
});
