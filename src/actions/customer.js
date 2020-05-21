export const NAMESPACE = 'customer';

export function CUSTOMER_LIST(payload) {
  // console.log('执行了：：CUSTOMER_LIST');
  return {
    type: `${NAMESPACE}/getCustomerList`,
    payload,
  };
}
