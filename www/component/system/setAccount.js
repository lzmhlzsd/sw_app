$( document ).on( "pageInit", "#page-system-setaccount", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-system-setaccount',
        data: function () {
            return {
                ruleForm: {
                    alias: ''
                },
                rules: {
                    alias: [
                        { required: true, message: '商户名称不能为空' }
                    ]
                }
            }
        },
        created() {
            this.ruleForm.alias = window.localStorage.getItem( 'alias' );
        },
        methods: {
            save( formName ) {
                var self = this;
                this.$refs[formName].validate( function ( valid ) {
                    if ( valid ) {
                        //todo:设置商户名称
                        store.post( '/account/set_account_alias', { shop_name: self.ruleForm.alias }, function ( data ) {
                            window.localStorage.setItem( 'alias', data.shop_name );
                            store.bus.$emit( 'cash.setAccount.setAccountName', data.shop_name );
                            $.router.back( './accountInfo.html' );
                        } )
                    }
                    else {
                        console.log( 'form validate fail' )
                    }
                } );
            }
        }
    } )
} );