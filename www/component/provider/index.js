$( document ).on( "pageInit", "#page-provider-index", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-provider-index',
        data: function () {
            return {
                name: '',
                phone: ''
            }
        },
        created() {
            var self = this;
            store.post( '/account/get_mafu_agent', {}, function ( data ) {
                self.name = data.name;
                self.phone = data.phone;
            } );
        },
        methods: {

        }
    } )
} );