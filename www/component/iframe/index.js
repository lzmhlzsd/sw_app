$( document ).on( "pageInit", "#page-iframe-index", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-iframe-index',
        data: function () {
            return {
                title: '',
                src: ''
            }
        },
        created() {
            this.title = store.get( 'iframe_title' );
            this.src = store.get( 'iframe_src' );
        },
        methods: {}
    } )
} );