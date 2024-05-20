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
        const values = await this.form.submit();
        console.log(values);
        my.alert({
            title: 'Submission',
            content: JSON.stringify(values),
        });
    },
});
