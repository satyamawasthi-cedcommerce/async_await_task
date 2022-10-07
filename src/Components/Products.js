import React, { useState } from "react";
import {
  Page,
  Card,
  Button,
  Heading,
  FormLayout,
  TextField,
  Stack,
  SkeletonBodyText,
  Spinner,
} from "@shopify/polaris";
import { Select } from "@shopify/polaris";
function Products() {
  // var selectCountArr = [];
  const [count, setCount] = useState([]);
  const [products, setProducts] = useState([]);
  const [basic, setBasic] = useState([]);
  const [selectedVal, setSelectedVal] = useState([]);
  const [enable, setEnable] = useState(true);
  const [data, setData] = useState([]);
  const [attrPayload, setAttrPayload] = useState();
  const [attributes, setAttributes] = useState([]);
  const [attributeOptions, setAttributeOptions] = useState([]);
  const [selectedAttribute, setselectedAttribute] = useState([]);
  const [loader, setLoader] = useState(false);
  const [buttonLoad, setButtonLoad] = useState(false);
  // for fetching data on the onClick event first button
  const fetchData = async() => {
    var url = `https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/`;
    var payload = {
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      selected: [],
      user_id: "63329d7f0451c074aa0e15a8",
      target: {
        marketplace: "amazon",
        shopId: "530",
      },
    };
    var Header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      appTag: "amazon_sales_channel",
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjk2NTY4MDE3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2U1ZjUxYWRkZGFlMjIyNjczN2E5MiJ9.m5LW1XQ_w6E8Y_ZAWV-SqoqLUpgyeQXe3R7aGKhCfkxA0h0i2oESFxS3NXvsqU2zBWO9iPa5vobjXypZCEo7ZbjieaowfryVym-Yc2Kc-SkfHJfr7a2QrXxfKql0nBX0SvgEfVdWKxmVb3AK7MyT60gVUCCh82H7ExXntXA46oTvIQkK2rMTC1pCAFxFcWPTUEvz2yfuyLf62533dDfbdWwnYBxOYXrTUBN9E6aOsbl8MDfglV7bRIiKCXF1hTRjyOzUzqp_Tns4kg3oT2zXKpv7mLFcPpEPnYveRP4TGi_N5gRjfyA4o7xAxTHIxmhlRrY7ZEFUx-BcW6aZz7tYNw`,
      "Ced-Source-Id": 500,
      "Ced-Source-Name": "shopify",
      "Ced-Target-Id": 530,
      "Ced-Target-Name": "amazon",
    };
    var method = "POST";
    setLoader(true);
    await
    fetch(url, {
      method: method,
      headers: Header,
      body: JSON.stringify(payload),
    })
      .then((result) => result.json())
      .then((item) => {
        setProducts(item);
        setData([...data, item.data]);
        if (item.success) {
          console.log(item);
          var dynamicOptions = [];
          item.data.forEach((element) => {
            dynamicOptions.push({
              label: element.name,
              value: JSON.stringify(element.parent_id),
              child: element.hasChildren,
            });
          });
          setBasic([...basic, dynamicOptions]);
          
          console.log(basic);
        }
      });

      setLoader(false);
  };
  // will execute on when the onChange event executes in the select component
  const fetchCategoryData = (value, indx) => {
    var temp = selectedVal;
    temp[indx] = value;
    setSelectedVal([...temp]);
    basic[indx].forEach((item, index) => {
      if (item.value === value && item.child === true) {
        var url = `https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/`;
        var payload = {
          target_marketplace:
            "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
          user_id: "63329d7f0451c074aa0e15a8",
          selected: JSON.parse(value),
          target: {
            marketplace: "amazon",
            shopId: "530",
          },
        };
        var Header = {
          Accept: "application/json",
          "Content-Type": "application/json",
          appTag: "amazon_sales_channel",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjk2NTY4MDE3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2U1ZjUxYWRkZGFlMjIyNjczN2E5MiJ9.m5LW1XQ_w6E8Y_ZAWV-SqoqLUpgyeQXe3R7aGKhCfkxA0h0i2oESFxS3NXvsqU2zBWO9iPa5vobjXypZCEo7ZbjieaowfryVym-Yc2Kc-SkfHJfr7a2QrXxfKql0nBX0SvgEfVdWKxmVb3AK7MyT60gVUCCh82H7ExXntXA46oTvIQkK2rMTC1pCAFxFcWPTUEvz2yfuyLf62533dDfbdWwnYBxOYXrTUBN9E6aOsbl8MDfglV7bRIiKCXF1hTRjyOzUzqp_Tns4kg3oT2zXKpv7mLFcPpEPnYveRP4TGi_N5gRjfyA4o7xAxTHIxmhlRrY7ZEFUx-BcW6aZz7tYNw `,
          "Ced-Source-Id": 500,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 530,
          "Ced-Target-Name": "amazon",
        };
        var method = "POST";
        setLoader(true)

        fetch(url, {
          method: method,
          headers: Header,
          body: JSON.stringify(payload),
        })
          .then((result) => result.json())
          .then((item) => {
            setProducts(item);
            setData([...data, item.data]);

            if (item.success) {
              console.log(item);
              var dynamicOptions = [];
              item.data.forEach((element) => {
                dynamicOptions.push({
                  label: element.name,
                  value: JSON.stringify(element.parent_id),
                  child: element.hasChildren,
                });
              });
              setLoader(false)
              setBasic([...basic, dynamicOptions]);
              console.log(basic);
            }
          });
      } else if (item.value === value && item.child === false) {
        setEnable(false);
        data[indx].forEach((item, index) => {
          if (JSON.stringify(item.parent_id) === value) {
            console.log(item.browseNodeId);
            var categoryArr = Object.keys(item.category);
            setAttrPayload({
              barcode_exemption: false,
              browser_node_id: item.browseNodeId,
              category: item.category[categoryArr[1]],
              sub_category: item.category[categoryArr[0]],
            });
          }
        });
      }
    });
  };
  // fetching attributes
  // this will execute when we click on second button which gets active when hasChildren===false
  const fetchAttribute = async() => {
    if (count.length === 0) {
      var url = `https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/`;
      var payload = {
        data: attrPayload,
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        selected: [],
        user_id: "63329d7f0451c074aa0e15a8",
        target: {
          marketplace: "amazon",
          shopId: "530",
        },
      };
      var Header = {
        Accept: "application/json",
        "Content-Type": "application/json",
        appTag: "amazon_sales_channel",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjk2NTY4MDE3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2U1ZjUxYWRkZGFlMjIyNjczN2E5MiJ9.m5LW1XQ_w6E8Y_ZAWV-SqoqLUpgyeQXe3R7aGKhCfkxA0h0i2oESFxS3NXvsqU2zBWO9iPa5vobjXypZCEo7ZbjieaowfryVym-Yc2Kc-SkfHJfr7a2QrXxfKql0nBX0SvgEfVdWKxmVb3AK7MyT60gVUCCh82H7ExXntXA46oTvIQkK2rMTC1pCAFxFcWPTUEvz2yfuyLf62533dDfbdWwnYBxOYXrTUBN9E6aOsbl8MDfglV7bRIiKCXF1hTRjyOzUzqp_Tns4kg3oT2zXKpv7mLFcPpEPnYveRP4TGi_N5gRjfyA4o7xAxTHIxmhlRrY7ZEFUx-BcW6aZz7tYNw `,
        "Ced-Source-Id": 500,
        "Ced-Source-Name": "shopify",
        "Ced-Target-Id": 530,
        "Ced-Target-Name": "amazon",
      };
      var method = "POST";
      setButtonLoad(true);
      await
      fetch(url, {
        method: method,
        headers: Header,
        body: JSON.stringify(payload),
      })
        .then((result) => result.json())
        .then((resultData) => {
          setAttributes(resultData);
          var tempArr = {};
          Object.values(resultData.data).map((item) =>
            Object.values(item).map(
              (data) =>
                (tempArr[data.label] = {
                  label: data.label,
                  value: data.label,
                  disabled: false,
                })
            )
          );
          setButtonLoad(false);
          console.log(tempArr);
          setAttributeOptions({ ...tempArr });
          console.log(attributeOptions);
        });
      setCount([...count, 1]);
    } else {
      setCount([...count, 1]);
    }
  };

  const handleChange = (value, index) => {
    let temp = selectedAttribute;
    temp[index] = value;
    setselectedAttribute([...temp]);
    var tempAttributeArr = attributeOptions;
    Object.values(tempAttributeArr).forEach((itr) => {
      if (selectedAttribute.includes(itr.value)) {
        itr.disabled = true;
        console.log(itr);
      } else {
        itr.disabled = false;
      }
    });
    setAttributeOptions({ ...tempAttributeArr });
  };
  // delete functionality
  const removeEntry = (index) => {
    console.log(index);
    var tempArr2 = count;
    tempArr2.splice(index, 1);
    setCount([...tempArr2]);
    var tempArr1 = selectedAttribute;
    tempArr1.splice(index, 1);
    setselectedAttribute([...tempArr1]);
    var tempAttributeArr = attributeOptions;
    Object.values(tempAttributeArr).forEach((itr) => {
      if (selectedAttribute.includes(itr.value)) {
        itr.disabled = true;
        console.log(itr);
      } else {
        itr.disabled = false;
      }
    });
    setAttributeOptions({ ...tempAttributeArr });
  };
  console.log(products);
  // returning Jsx
  return (
    <>
      <Page
        breadcrumbs={[{ content: "Products", url: "/products" }]}
        title="Select categories of the products"
        compactTitle
      >
        <Card title="Credit card" sectioned>
          <p>Credit card information</p>

          {/* button for fetching Api from the  */}
          <Button onClick={fetchData} primary>
            Get Products
          </Button>
          <hr />
          <br />
          {/* rendering the select tags */}
          {basic.map((item, index) => {
            return (
              <>
                <Card sectioned>
                  <Select
                    placeholder="--Select--"
                    label="Select Category"
                    options={basic[index]}
                    onChange={(value) => {
                      fetchCategoryData(value, index);
                    }}
                    value={selectedVal?.[index]}
                  />
                </Card>
                <br />
              </>
            );
          })}
          {loader ? (
            <>
              <Card sectioned>
                <SkeletonBodyText lines={2} />
              </Card>
            </>
          ) : (
            <></>
          )}
        </Card>
        <Card sectioned>
          <Heading>Optional Attributes</Heading>
          {buttonLoad ? (
            <>
              <Spinner accessibilityLabel="Spinner example" size="large" />
            </>
          ) : (
            <>
              {count.map((item, index) => (
                <>
                  <Card sectioned>
                    <FormLayout>
                      <FormLayout.Group>
                        <Stack alignment="center">
                          <Select
                            options={Object.values(attributeOptions)}
                            placeholder="--Select--"
                            onChange={(value) => {
                              handleChange(value, index);
                            }}
                            value={selectedAttribute?.[index]}
                          />
                          <TextField
                            type="text"
                            onChange={() => {}}
                            autoComplete="off"
                          />
                          <Button
                            plain
                            destructive 

                            onClick={() => removeEntry(index)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </FormLayout.Group>
                    </FormLayout>
                  </Card>
                </>
              ))}
            </>
          )}

          {/* button for fetching the attributes */}
          <hr />
          <Button 
          loading = {buttonLoad}
          
          disabled={enable} primary onClick={fetchAttribute}>
            Add attribute
          </Button>

          <hr />
          <br />
        </Card>
      </Page>
    </>
  );
}

export default Products;
