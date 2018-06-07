$( document ).on( "pageInit", "#page-account-details", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-account-details',
        data: function () {
            return {
                title: '',
                orderInfo: []
            }
        },
        created() {
            var orderdetail = store.get( 'orderdetail' );
            this.title = orderdetail.title;
            this.orderInfo = orderdetail.data;
            // switch ( store.getQueryString( 'journal_type' ) ) {
            //     case '1':
            //         self.title = '收款详情';
            //         break;
            //     case '10':
            //         self.title = '服务详情';
            //         break;
            //     case '11':
            //         self.title = '补贴详情';
            //         break;
            //     case '3':
            //         self.title = '提现详情';
            //         break;
            // }

            // var details = store.get( 'balance_details' );
            // var balance_details = [
            //     { name: '时间', value: details.create_date },
            //     { name: '金额', value: details.amount },
            //     { name: '类型', value: details.type }
            // ];
            // if ( details.journal_type != 'withdraw' && details.journal_type != 'service' && details.journal_type != 'subsidy' ) {
            //     balance_details.push( {
            //         name: '支付方式', value: details.channel
            //     } )
            // }
            // if ( details.journal_type != 'withdraw' ) {
            //     balance_details.push( {
            //         name: '订单编号', value: details.order_no
            //     }, {
            //             name: '商户单号', value: details.transaction_no
            //         } )
            // }
            // balance_details.push( {
            //     name: '交易单号', value: details.charge_id
            // } )
            // self.orderInfo = balance_details;
        },
        methods: {
        }
    } )
} );