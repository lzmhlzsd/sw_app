$( document ).on( "pageInit", "#page-notice-index", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-notice-index',
        data: function () {
            return {
                shop_name: '',
                no: '',
                qrcodeImg: ''
            }
        },
        created() {
            var self = this;
            store.post( '/manage/invitecode', {}, function ( data ) {
                // var qrcode = new QRCode('notice-code', {
                //     text: data,
                //     width: $('#notice-code').parent().width() * 0.68,
                //     height: $('#notice-code').parent().width() * 0.68,
                //     colorDark : '#000000',
                //     colorLight : '#ffffff',
                //     correctLevel : QRCode.CorrectLevel.H
                //   });
                self.qrcodeImg = data
            } )
        },
        mounted() {

        },
        methods: {
            noticeAdmin() {
                $.router.loadPage( './list.html' );
            }
        }
    } )
} );