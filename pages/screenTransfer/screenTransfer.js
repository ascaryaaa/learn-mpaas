import { Form } from 'antd-mini/es/Form/form';

Page({
    data: {
        position: 'horizontal',
    },
    onLoad() {
        this.form = new Form();
    },
    handleRef(ref) {
        this.form.addItem(ref);
    },
    reset() {
        this.form.reset();
    },
    async submit() {
        try {
            const values = await this.form.submit();
            console.log('Form values:', values);

            if (!values.fromCardId || !values.toCardId || !values.amount) {
                my.alert({
                    title: 'Error',
                    content: 'Please fill in all fields',
                });
                return;
            }

            // Make an HTTP request to the transfer endpoint
            my.httpRequest({
                url: 'http://localhost:8083/cards/transfer',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    fromCardId: parseInt(values.fromCardId),
                    toCardId: parseInt(values.toCardId),
                    amount: parseFloat(values.amount),
                },
                success: (res) => {
                    console.log('Transfer successful:', res);
                    my.alert({
                        title: 'Transfer Successful',
                        content: JSON.stringify(res),
                    });
                },
                fail: (err) => {
                    console.error('Transfer failed:', err);
                    my.alert({
                        title: 'Transfer Failed',
                        content: JSON.stringify(err),
                    });
                }
            });
        } catch (error) {
            console.error('Form submission error:', error);
            my.alert({
                title: 'Error',
                content: 'Failed to submit form. Please try again.',
            });
        }
    },
});
