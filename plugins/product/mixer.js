import { cloneDeep } from 'lodash'

export default (item) => {
  item.selected_vartians = {}

  /**
   * যদি প্রত্যেক টি ভ্যারিয়েন্ট টাইপ  যেমন (size,color,weight) অপসন  একটাই  হয় তাহলে ডিফল্ট ভাবে ওই অপসন সিলেক্টেড
   * তাকবে অন্নথায় ভিসিটর কে সিলেক্ট করে নিতে হবে
   */
  // forIn(keys(item.available_variant_options),v=>{
  //    const arr = item.available_variant_options[v];
  //    if(arr.length==1){
  //     item.selected_vartians[v] = head(arr).option_id;
  //    }else{
  //     item.selected_vartians[v]= null;
  //    }

  // })

  item.cartQuantities = 1
  item.loved = true

  return cloneDeep(item)
}
