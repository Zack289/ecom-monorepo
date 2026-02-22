import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {

    const {getToken} = await auth();
    const token = await getToken();

    console.log(token);
    //product service
    const resProduct = await fetch("http://localhost:8000/test", {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    const dataProduct = await resProduct.json();

    console.log(dataProduct);

    // order service 

    const resOrder = await fetch("http://localhost:8001/test", {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    const dataOrder = await resOrder.json();

    console.log(dataOrder);
    
    // order service 

    const resPyment = await fetch("http://localhost:8002/test", {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    const dataPayment = await resPyment.json();

    console.log(dataPayment);
  return (
    <div>TestPage</div>
  );
};

export default TestPage;