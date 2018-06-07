$( document ).on( "pageInit", "#page-stores-clerk", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-stores-clerk',
        data: function () {
            return {
                open_clerks: [],
                close_clerks: [],
                shop_id: '',
            }
        },
        created() {
            var self = this;
            self.shop_id = store.getQueryString( 'id' );
            this.getClerkList();
            store.bus.$on( 'stores.clerkEdit.getClerk', function ( data ) {
                self.getClerkList();
            } )
        },
        mounted() {
            
        },
        methods: {
            clerk( action, data ) {
                if ( typeof data != 'undefined' ) {
                    store.set( 'clerk_info', data );
                }    
                $.router.loadPage('./clerkEdit.html?action=' + action + '&id=' + this.shop_id)
            },
            // clerk( data ) {
            //     $.router.loadPage('./clerk.html')
            // }
            getClerkList() {
                var self = this;
                store.post( '/shop/get_shop_clerk', { shop_id: self.shop_id }, function ( data ) {
                    self.open_clerks = _.where( data.clerk_list, { pay_status: '1' } );
                    self.close_clerks = _.where( data.clerk_list, { pay_status: '0' } );
                } )
            },
            qrcode( item ) {
                $.router.loadPage( './../goodsCode/receive.html?clerkid=' + item.id );
            }
        }
    } )
} );