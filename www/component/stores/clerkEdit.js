$( document ).on( "pageInit", "#page-stores-clerkedit", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-stores-clerkedit',
        data: function () {
            return {
                title: '',
                action: '',
                clerk: null,
                shop_id: '',
                ruleForm: {
                    name: '',
                    phone: '',
                    desc: '',
                    pay_status: 1
                },
                rules: {
                    name: [
                        { required: true, message: '店员名称不能为空' }
                    ],
                    phone: [
                        { required: true, message: '手机号码不能为空' },
                        { phone: true, message: '请填写正确的手机号码' }
                    ]
                }
            }
        },
        created() {
            this.action = store.getQueryString( 'action' );
            this.shop_id = store.getQueryString( 'id' );
            if ( this.action == 'add' ) {
                this.title = '添加店员';
            }
            else {
                this.clerk = store.get( 'clerk_info' );
                this.title = '编辑店员';
                this.ruleForm.name = this.clerk.clerk_name;
                this.ruleForm.phone = this.clerk.phone;
                this.ruleForm.address = this.clerk.address;
                this.ruleForm.pay_status = ( this.clerk.pay_status == "1" ? 1 : 0 );
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
                            store.post( '/shop/create_clerk', {
                                shop_id: self.shop_id,
                                clerk_name: self.ruleForm.name,
                                phone: self.ruleForm.phone,
                                pay_status: self.ruleForm.pay_status,
                                remark: self.ruleForm.desc
                            }, function ( data ) {
                                store.bus.$emit('stores.clerkEdit.getClerk')
                                $.toast( data );
                                $.router.back("./clerk.html"); 
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
                            store.post( '/shop/edit_clerk', {
                                shop_id: self.shop_id,
                                clerk_id: self.clerk.id,
                                clerk_name: self.ruleForm.name,
                                phone: self.ruleForm.phone,
                                pay_status: self.ruleForm.pay_status,
                                remark: self.ruleForm.desc
                            }, function ( data ) {
                                store.bus.$emit('stores.clerkEdit.getClerk')
                                $.toast( data );
                                $.router.back("./clerk.html"); 
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