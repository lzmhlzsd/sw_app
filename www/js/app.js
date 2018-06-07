var app = {
    pageIndex: function ( e, id, page ) {
        $( page ).on( 'click', '.tab-item', function () {
            var index = $( this ).data( 'index' )
            $( '.page-current' ).find( '.content' ).removeClass( 'active' ).eq( index ).addClass( 'active' )
            $( '.page-current' ).find( '.bar-nav' ).removeClass( 'active' )
            if ( index > 0 ) {
                $( '.page-current' ).find( '.bar-nav' ).eq( index - 1 ).addClass( 'active' )
            }
        } )
    },
    pageOrderList: function ( e, id, page ) {
        var vm = new Vue( {
            el: '#page-order-list',
            data: function () {
                return {
                    orderlist: [1,2,3,4,5]
                }
            },
            created() {
                
            },
            methods: {
                withdarw() {
                    console.log('withdarw')
                }
            }
        } )
    }
}