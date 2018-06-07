$( document ).on( "pageInit", "#page-account-balance", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-account-balance',
        data: function () {
            return {
                start_date: moment().format( 'YYYY-MM-DD' ),
                end_date: moment().format( 'YYYY-MM-DD' ),
                receivables: {
                    total: '0.00',
                    receivables: {
                        num: 0,
                        amount: '0.00'
                    },
                    children: [
                        {
                            total: '', num: '',
                            clerks: [
                                {}, {}
                            ]
                        }
                    ]
                },
                service: {
                    total: '0.00',
                    service: {
                        num: 0,
                        amount: '0.00'
                    },
                    subsidy: {
                        num: 0,
                        amount: '0.00'
                    },
                    refund: {
                        count: 0,
                        amount: '0.00'
                    }
                },
                withdraw: {
                    total: '0.00',
                    withdraw: {
                        num: 0,
                        amount: '0.00'
                    }
                },
                refund: {
                    total: '0.00',
                    refund: {
                        num: 0,
                        amount: '0.00'
                    }
                }
            }
        },
        created() {
            var self = this;
            store.bus.$on( 'account.balance.selectDate', function ( data ) {
                self.start_date = data.start_date;
                self.end_date = data.end_date;
                self.getBalance();
            } )
            self.getBalance();
        },
        methods: {
            formatDate() {
                if ( this.start_date != '' && this.end_date != '' ) {
                    return '(' + this.start_date.replace( /-/g, '' ) + '-' + this.end_date.replace( /-/g, '' ) + ')';
                }
            },
            selectDate() {
                var self = this;
                var buttons1 = [
                    {
                        text: '今日',
                        onClick: function () {
                            self.start_date = moment().format( 'YYYY-MM-DD' );
                            self.end_date = moment().format( 'YYYY-MM-DD' );
                            self.getBalance();
                        }
                    },
                    {
                        text: '昨日',
                        onClick: function () {
                            self.start_date = moment().subtract( 1, 'days' ).format( 'YYYY-MM-DD' );
                            self.end_date = moment().subtract( 1, 'days' ).format( 'YYYY-MM-DD' );
                            self.getBalance();
                        }
                    },
                    {
                        text: '本月',
                        onClick: function () {
                            self.start_date = moment().startOf( 'month' ).format( 'YYYY-MM-DD' );
                            self.end_date = moment().endOf( 'month' ).format( "YYYY-MM-DD" );
                            self.getBalance();
                        }
                    },
                    {
                        text: '上月',
                        onClick: function () {
                            self.start_date = moment().subtract( 1, 'months' ).startOf( 'month' ).format( 'YYYY-MM-DD' );
                            self.end_date = moment().subtract( 1, 'months' ).endOf( 'month' ).format( "YYYY-MM-DD" );
                            self.getBalance();
                        }
                    },
                    {
                        text: '自选',
                        onClick: function () {
                            $.router.loadPage( "./selectDate.html" );
                        }
                    }
                ];
                var buttons2 = [
                    {
                        text: '取消',
                        bg: 'primary'
                    }
                ];
                var groups = [buttons1, buttons2];
                $.actions( groups );
            },
            getBalance() {
                //todo:根据时间段查询账户收支
                console.log( 'getBalance' );
                var self = this;
                store.post( '/balance/balance_count', {
                    start_time: this.start_date,
                    end_time: this.end_date
                }, function ( data ) {
                    self.receivables.total = data.receivables.sum_income;
                    self.receivables.receivables.num = data.receivables.count;
                    self.receivables.receivables.amount = data.receivables.sum_income;
                    self.service.total = data.total_service_charge;
                    self.service.service.num = data.service_charge.count;
                    self.service.service.amount = data.service_charge.sum_outcome;
                    self.service.subsidy.num = data.subsidy.count;
                    self.service.subsidy.amount = data.subsidy.sum_income;
                    self.service.refund.num = data.refund_service.count;
                    self.service.refund.amount = data.refund_service.sum_income;
                    self.withdraw.total = data.withdrawals.sum_outcome;
                    self.withdraw.withdraw.num = data.withdrawals.count;
                    self.withdraw.withdraw.amount = data.withdrawals.sum_outcome;
                    self.refund.total = data.refund_amount.sum_outcome;
                    self.refund.refund.num = data.refund_amount.count;
                    self.refund.refund.amount = data.refund_amount.sum_outcome;
                } )
            }
        }
    } )
} );