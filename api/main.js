new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        products: '',
        Nama: '',
        Deskripsi: '',
        dialogAdd: false,
        dialogEdit: false,
        dialogDelete: false,
        IdEdit: '',
        NamaEdit: '',
        DeskripsiEdit: '',
        IdDelete: '',
        NamaDelete: ''
    },
    created: function () {
        this.getProducts()
    },
    methods: {
 
        // Get Product
        getProducts: function () {
            axios.get('http://localhost:8080/products')
                .then(res => {
                    this.products = res.data;
                })
                .catch(err => {
                    // handle error
                    console.log(err);
                })
        },
 
        // Create New product
        saveProduct: function () {
            axios.post('http://localhost:8080/products', {
                    nama: this.Nama,
                    deskripsi: this.Deskripsi
                })
                .then(res => {
                    // handle success
                    this.getProducts();
                    this.Nama = '';
                    this.Deskripsi = '';
                    this.dialogAdd = false;
                })
                .catch(err => {
                    // handle error
                    console.log(err);
                })
        },
 
        // Get Edit and Show data to Modal
        getEdit: function (product) {
            this.dialogEdit = true;
            this.IdEdit = product.id;
            this.NamaEdit = product.nama;
            this.DeskripsiEdit = product.deskripsi;
        },
 
        // Get Delete and Show Confirm Modal
        getDelete: function (product) {
            this.dialogDelete = true;
            this.IdDelete = product.id;
            this.NamaDelete = product.nama;
        },
 
        // Update Product
        updateProduct: function () {
            axios.put(`http://localhost:8080/products/${this.IdEdit}`, {
                    nama: this.NamaEdit,
                    deskripsi: this.DeskripsiEdit
                })
                .then(res => {
                    // handle success
                    this.getProducts();
                    this.dialogEdit = false;
                })
                .catch(err => {
                    // handle error
                    console.log(err);
                })
        },
 
        // Delete Product
        deleteProduct: function () {
            axios.delete(`http://localhost:8080/products/${this.IdDelete}`)
                .then(res => {
                    // handle success
                    this.getProducts();
                    this.dialogDelete = false;
                })
                .catch(err => {
                    // handle error
                    console.log(err);
                })
        }
    }
})