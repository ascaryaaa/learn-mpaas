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

            if (!values.toCardNumber || !values.amount) {
                my.alert({
                    title: 'Error',
                    content: 'Please fill in all fields',
                });
                return;
            }

            // Retrieve the user ID from local storage
            my.getStorage({
                key: 'userId',
                success: (res) => {
                    const userId = res.data;
                    console.log('User ID:', userId);

                    // Make sure the userId is available
                    if (!userId) {
                        my.alert({
                            title: 'Error',
                            content: 'User ID not found',
                        });
                        return;
                    }

                    // Make an HTTP request to fetch the fromCardNumber based on userId
                    my.httpRequest({
                        url: `http://localhost:8083/cards/${userId}`,
                        method: 'GET',
                        success: (res) => {
                            console.log('Fetch fromCardNumber successful:', res);
                            const fromCardNumber = res.data.cardNumber;
                            console.log('From Card Number:', fromCardNumber);

                            // Log raw data before storing
                            const transactionDetails = {
                                fromCardNumber: fromCardNumber,
                                toCardNumber: values.toCardNumber,
                                amount: values.amount,
                            };
                            console.log('Raw Data to be stored:', transactionDetails);

                            // Store transaction details in local storage
                            my.setStorage({
                                key: 'transactionDetails',
                                data: transactionDetails,
                                success: () => {
                                    console.log('Transaction details stored successfully.');

                                    // Navigate to confirmation screen
                                    my.navigateTo({
                                        url: '/pages/screenTransfer/screenTransferKonfirmasi/screenTransferKonfirmasi'
                                    });
                                },
                                fail: (err) => {
                                    console.error('Failed to store transaction details:', err);
                                    my.alert({
                                        title: 'Error',
                                        content: 'Failed to store transaction details. Please try again.',
                                    });
                                }
                            });
                        },
                        fail: (err) => {
                            console.error('Fetch fromCardNumber failed:', err);
                            my.alert({
                                title: 'Error',
                                content: 'Failed to fetch fromCardNumber. Please try again.',
                            });
                        }
                    });
                },
                fail: (err) => {
                    console.error('Failed to retrieve user ID:', err);
                    my.alert({
                        title: 'Error',
                        content: 'Failed to retrieve user ID. Please try again.',
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
