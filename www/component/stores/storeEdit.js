$( document ).on( "pageInit", "#page-stores-storeedit", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-stores-storeedit',
        data: function () {
            return {
                title: '',
                action: '',
                shop: null,
                ruleForm: {
                    name: '',
                    phone: '',
                    address: '',
                    pay_status: 1
                },
                rules: {
                    name: [
                        { required: true, message: '分店名称不能为空' }
                    ],
                    phone: [
                        { required: true, message: '分店电话不能为空' }
                    ],
                    address: [
                        { required: true, message: '分店地址不能为空' }
                    ]
                }
            }
        },
        created() {
            this.action = store.getQueryString( 'action' );
            
            if ( this.action == 'add' ) {
                this.title = '添加店铺';
            }
            else {
                this.shop = store.get( 'store_info' );
                this.title = '编辑店铺';
                this.ruleForm.name = this.shop.shop_name;
                this.ruleForm.phone = this.shop.phone;
                this.ruleForm.address = this.shop.address;
                this.ruleForm.pay_status = ( this.shop.pay_status == "1" ? 1 : 0 );
            }
        },
        mounted() {

        },
        methods: {
            save( formName ) {
                var self = this;
                if ( self.action == 'add' ) {
                    this.$refs[formName].validate( function ( valid ) {
                        if ( valid ) {
                            store.post( '/shop/create_shop', {
                                shop_name: self.ruleForm.name,
                                phone: self.ruleForm.phone,
                                address: self.ruleForm.address,
                                pay_status: self.ruleForm.pay_status
                            }, function ( data ) {
                                store.bus.$emit('stores.storeEdit.getStore')
                                $.toast( data );
                                $.router.back("./store.html"); 
                            } )
                        }
                        else {
                            console.log( 'form validate fail' )
                        }
                    } )
                }
                else {
                    this.$refs[formName].validate( function ( valid ) {
                        if ( valid ) {
                            store.post( '/shop/edit_shop', {
                                id: self.shop.id,
                                shop_name: self.ruleForm.name,
                                phone: self.ruleForm.phone,
                                address: self.ruleForm.address,
                                pay_status: self.ruleForm.pay_status
                            }, function ( data ) {
                                store.bus.$emit('stores.storeEdit.getStore')
                                $.toast( data );
                                $.router.back("./store.html"); 
                            } )
                        }
                        else {
                            console.log( 'form validate fail' )
                        }
                    } )
                }
            }
        }
    } )
} );