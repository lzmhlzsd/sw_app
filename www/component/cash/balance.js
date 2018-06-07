$( document ).on( "pageInit", "#page-cash-balance", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-cash-balance',
        data: function () {
            return {
                balance: '0.00',
                withdrawal: '0.00'
            }
        },
        created() {
            //this.select_bank = store.getQueryString( 'bankcode' ).toString();
            //查询balance、withdrawal
            //store.set( 'balance', '12546.00' )
            var self = this;
            store.post( '/account/get_account_amount', { }, function ( data ) {
                self.balance = data.all_amount;
                self.withdrawal = data.can_use_amount;
            }, true )
        },
        methods: {
            withdrawAll() {
                //store.set( 'withdrawal', this.withdrawal )
                $.router.loadPage( "./withdraw.html?withdrawal=" + this.withdrawal );
            }
        }
    } )
} );