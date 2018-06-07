$(document).on("pageInit", "#page-notice-notice", function (e, id, page) {
    var vm = new Vue({
        el: '#page-notice-notice',
        data: function () {
            return {
                noticelist: []
            }
        },
        created() {
            var self = this;
            store.post( '/notice/get_notice_list', {
                type: 'mafuh5',
                location: 'dashboard'
            }, function ( data ) {
                self.noticelist = data;
            } )
        },
        methods: {
            formatedate( timestamp ) {
                return moment( timestamp * 1000 ).format( 'YYYY-MM-DD HH:mm' );
            }
        }
    })
});