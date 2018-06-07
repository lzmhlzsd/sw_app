$( document ).on( "pageInit", "#page-stores-store", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-stores-store',
        data: function () {
            return {
                open_stores: [],
                close_stores: []
            }
        },
        created() {
            var self = this;
            self.getShopList();
            store.bus.$on( 'stores.storeEdit.getStore', function ( data ) {
                self.getShopList();
            } )
        },
        mounted() {
            
        },
        methods: {
            shop( action, data ) {
                if ( typeof data != 'undefined' ) {
                    store.set( 'store_info', data );
                }    
                $.router.loadPage('./storeEdit.html?action=' + action)
            },
            clerk( data ) {
                $.router.loadPage('./clerk.html')
            },
            getShopList() {
                var self = this;
                store.post( '/shop/get_shop_list', { }, function ( data ) {
                    self.open_stores = _.where( data.shop_list, { pay_status: '1' } );
                    self.close_stores = _.where( data.shop_list, { pay_status: '0' } );
                } )
            }
        }
    } )
} );