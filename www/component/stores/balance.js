$( document ).on( "pageInit", "#page-stores-balance", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-stores-balance',
        data: function () {
            return {
                start_date: moment().format( 'YYYY-MM-DD' ),
                end_date: moment().format( 'YYYY-MM-DD' ),
                payment: ['all'],
                store: ['all'],
                rece_detail: [],
                rece_total: {
                    num: 0,
                    amount: '0.00'
                },
                service_total: {
                    amount: 0
                },
                service_detail: [{
                    num: 0,
                    amount: '0.00'
                }],
                service_refund_total: {
                    amount: 0
                },
                service_refund_detail: [{
                    num: 0,
                    amount: '0.00'
                }]
                // withdraw: {
                //     total: '24.00',
                //     withdraw: {
                //         num: 2,
                //         amount: '-24.00'
                //     }
                // }
            }
        },
        created() {
            var self = this;
            store.bus.$on( 'stores.balance.selectDate', function ( data ) {
                self.start_date = data.start_date;
                self.end_date = data.end_date;
                self.payment = data.selectPaymentTypeFlag;
                self.store = data.selectStoreFlag;
                self.getBalance();
            } )
            self.getBalance();
        },
        methods: {
            formatDate() {
                if ( this.start_date != '' && this.end_date != '' ) {
                    return this.start_date.replace( /-/g, '' ) + '-' + this.end_date.replace( /-/g, '' );
                }
            },
            getBalance() {
                //todo:根据时间段查询账户收支
                var self = this;
                store.post( '/order/get_shop_order_statistics', {
                    select_datetime_start: self.start_date,
                    select_datetime_end: self.end_date,
                    select_payment: self.payment,
                    select_store: self.store
                }, function ( data ) {
                    for ( var i = 0; i < data.rece_detail.length; i++ ) {
                        data.rece_detail[i]['active'] = false;
                    }
                    self.rece_detail = data.rece_detail;
                    self.rece_total = data.rece_total;
                    self.service_total = data.service_total;
                    self.service_detail = data.service_detail;
                    self.service_refund_total = data.service_refund_total;
                    self.service_refund_detail = data.service_refund_detail;
                }, true );
            },
            toggle( item ) {
                item.active = !item.active;
            },
            receDetail( item, ch ) {
                console.log(this.payment.toString())
                $.router.loadPage( './orderlist.html?' + 'select_datetime_start=' + this.start_date
                    + '&select_datetime_end=' + this.end_date
                    + '&select_store=' + item.shop_id
                    + '&select_cleark=' + ch.clerk_id
                    + '&journal_type=1'
                    + '&select_payment=' + this.payment
                    + '&exceptid=null'
                    + '&page_size=20'
                );
            },
            serviceDetail() {
                $.router.loadPage( './orderlist.html?' + 'select_datetime_start=' + this.start_date
                    + '&select_datetime_end=' + this.end_date
                    + '&select_store=' + this.store
                    + '&select_cleark=null'
                    + '&journal_type=10'
                    + '&select_payment=' + this.payment
                    + '&exceptid=null'
                    + '&page_size=20'
                );
            }
        }
    } )
} );