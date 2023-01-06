import Head from "next/head";
import { CustomFormsWrapper } from "../components/types";
import { FormLayout } from "../components/FormFieds/FormLayouts";
import { useState  } from "react"


export default function Home() {

  const [htmlTemplate, setHTMLTemplate] = useState("")

  const composeHTMLEmailTemplate = (output: {[keys: string]: any}, callback: Function) => {

    let paragraphs: string[] = []

    const values = Object.values(output)
    const keys = Object.keys(output)

    for(let i=0; i < keys.length; i++) {
      let p = `<p>${keys[i]}: ${values[i]}</p>\n\t`
      paragraphs.push(p)
    }

    let template = `
      <html>
      
      <body>
       ${paragraphs.join("")}
      </body>
      </html>  
    `


    callback(template)
  }


  const formJsonData = `{
    "type": "PAYROLL_ENQUIRY",
    "title": "Payroll Enquiry",
    "description": "Please use this form for any Payroll related enquiries.",
    "formFields": [
      {
        "type": "select",
        "label": "What does your enquiry relate to?",
        "name": "enqiryType",
        "options": [
          {
            "value": "INCORRECT_PAY",
            "label": "Incorrect Pay"
          },
          {
            "value": "MISSING_EXPENSE",
            "label": "Missing Expense"
          },
          {
            "value": "CHANGE_OF_BANK_DETAIL",
            "label": "Change Of Bank Detail"
          },
          {
            "value": "CHANGE_OF_ADDRESS",
            "label": "Change Of Address"
          },
          {
            "value": "OTHER",
            "label": "Other"
          }
        ],
        "validationType": "string",
        "validations": [
          {
            "type": "required",
            "params": ["Enquiry type is required"]
          }
        ]
      },
      {
        "type": "date",
        "label": "Date of payslip being queried (if applicable)",
        "name": "date",
        "validationType": "string",
        "validations": [
          {
            "type": "nullable",
            "params": ["Date is required"] 
          }
        ]
      },
      {
        "type": "textarea",
        "label": "Query",
        "name": "query",
        "validationType": "string",
        "validations": [
          {
            "type": "required",
            "params": ["Query is required"]
          }
        ]
      }
    ]
  }`;

  
  const formData: CustomFormsWrapper = JSON.parse(formJsonData);


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{ display: "flex", flexDirection: "column"}}>
          <FormLayout formData={formData} submitHandler={composeHTMLEmailTemplate} callback={setHTMLTemplate}/>

          <div>
            <h5>Outputs</h5>

            <div>
              <pre>
              {htmlTemplate}

              </pre>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
