$( document ).on( "pageInit", "#page-system-accountinfo", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-system-accountinfo',
        data: function () {
            return {
                alias: '',
                phone: '',
                rate: 0,
                tn: 0,
                mafu_user_type: 0
            }
        },
        created() {
            var self = this;
            self.alias = window.localStorage.getItem( 'alias' );
            self.mafu_user_type = window.localStorage.getItem( 'mafu_user_type' );
            if ( self.mafu_user_type == 0 ) {
                store.post( '/account/get_account_list', {}, function ( data ) {
                    self.phone = data.phone;
                    self.rate = data.rate;
                    self.tn = data.tn;
                } )
            }    
            store.bus.$on( 'cash.setAccount.setAccountName', function ( data ) {
                self.alias = data
            } )
        },
        methods: {
            logout() {
                store.post( '/account/logout', {}, function ( data ) {
                    window.localStorage.removeItem( 'token' );
                    window.localStorage.removeItem( 'mafu_user_type' );
                    window.localStorage.removeItem( 'user_id' );
                    window.localStorage.removeItem( 'clerk_id' );
                    window.localStorage.removeItem( 'alias' );
                    window.localStorage.removeItem( 'status' );
                    window.localStorage.removeItem( 'phone' );
                    $.router.loadPage( "./../login/login.html" ); 
                    
                } )
            }
        }
    } )
} );