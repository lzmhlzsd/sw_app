$( document ).on( "pageInit", "#page-notice-list", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-notice-list',
        data: function () {
            return {
                list: [],
                editFlag: 0,   //0=编辑；1=取消编辑
                select_openid: ''
                
            }
        },
        created() {
            this.getWxNotifyList();
            // self.list = [
            //     { src: './../../img/logo.png', name: '王二小', checked: false },
            //     { src: './../../img/logo.png', name: '王二小', checked: false },
            //     { src: './../../img/logo.png', name: '王二小', checked: false },
            //     { src: './../../img/logo.png', name: '王二小', checked: false },
            //     { src: './../../img/logo.png', name: '王二小', checked: false }
            // ]
        },
        methods: {
            editOrSave() {
                this.editFlag = 1 - this.editFlag;
            },
            deleteList() {
                var self = this;
                if ( this.editFlag == 1 ) {
                    //console.log( 'delete' );
                    var select = _.where( this.list, { wx_openid: self.select_openid } );
                    if ( select.length > 0 ) {
                        store.post( '/manage/delete_bind', {
                            "master_mafu_id": select[0].master_mafu_id,    //码付商户id
                            "openid": select[0].wx_openid      //微信收银通知人的openid
                        }, function ( data ) {
                            self.getWxNotifyList();
                        } )
                    }    
                }
            },
            getWxNotifyList() {
                var self = this;
                store.post( '/manage/wx_notify_list', {}, function ( data ) {
                    _.each( data, function ( value, key ) {
                        value['checked'] = false;
                    } )
                    self.list = data;
                } )
            }
        }
    } )
} );