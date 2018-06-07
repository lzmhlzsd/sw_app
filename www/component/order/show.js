$( document ).on( "pageInit", "#page-order-show", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-order-show',
        data: function () {
            return {
                amount: '0.00',
                name: '',
                clerk: '',
                order: '',
                datetime: '',
                no: '',
                merchant: '',
                refund_status: '',
                pay_type: '',
                btn_title: ''
                // orderInfo: [
                //     { name: '订单名称', value: '小爱家服饰店' },
                //     { name: '分店店员', value: '员工1号' },
                //     { name: '交易单号', value: '342568745874598' },
                //     { name: '交易时间', value: '2017-05-20 09:58:18' },
                //     { name: '订单编号', value: '342568745874598' },
                //     { name: '商户单号', value: '342568745874598' }
                // ],
                // paymentType: [
                //     { name: '支付方式', value: '微信支付' },
                //     { name: '支付账户', value: '线下支付' }
                // ]
            }
        },
        created() {
            var data = store.get( 'order-detail' );
            this.amount = data.amount;
            this.name = data.subject;
            this.clerk = data.clerk_name;
            this.order = data.id;
            this.datetime = data.created;
            this.no = data.order_no;
            this.merchant = data.transaction_no;
            this.refund_status = data.refund_status;
            this.pay_type = data.pay_type;

            this.formatBtnTitle();
        },
        methods: {
            //退款
            refund_order() {
                var self = this;
                if ( self.refund_status == '-1' || self.refund_status == '0' ) {
                    $.confirm( '是否申请退款?',
                        function () {
                            store.post( '/order/refund_order', {
                                order_no: self.no
                            }, function ( data ) {
                                self.refund_status = data.refund_status;
                                self.formatBtnTitle();
                            } )
                            console.log( '申请退款' )
                        },
                        function () {

                        }
                    );
                }
            },
            formatBtnTitle() {
                switch ( this.refund_status ) {
                    case '-1':
                        this.btn_title = '申请退款';
                        break;
                    case '0':
                        this.btn_title = '再次退款';
                        break;
                    case '1':
                        this.btn_title = '退款成功';
                        break;
                    case '2':
                        this.btn_title = '退款中';
                        break;
                }
            }
        }
    } )
} );