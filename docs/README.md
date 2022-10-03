## Old Orders Configuration

### Renders old orders info from Masterdata in My Account.

### Application Disclaimer

This app and all affiliated services are provided “as is”, without warranty of any kind, either express or implied. Neither the publisher nor its partners, affiliates, employees, or contractors guarantee that this app will meet your requirements, provide uninterrupted use, or operate without delay or without error. Neither the publisher nor its partners, affiliates, employees, or contractors assume any responsibility for any errors and malfunctions within the app and will not provide support or maintenance of any kind.
 

All provisions and warranties of any kind, express or implied, including but not limited to any guarantees of performance, process integrity, or particular functionalities, are hereby disclaimed and excluded unless otherwise prohibited or restricted by applicable law.

_Developed under EE FPA._
### MasterData Configuration
1. You need to create and Old Orders Entity by following the steps:
- Go to {yourStoreName}.vtexcrm.com.br where {yourStoreName} needs to be replaced with your tenant name
- Go to Profile System -> Settings 

![md-1](/docs/md-1.png "Profile System Settings")
- Go to MasterData:

![md-2](/docs/md-2.png "MasterData interface")
- You will enter MasterData client -> Go to Data Entities 

![md-3](/docs/md-3.png "MasterData Data Entities")
- Go to Add New 

![md-4](/docs/md-4.png "Add New Entity")
- Create the Old Orders Entity (the entity identifier is formed from only 2 characters)
  
**!! The Entity name should only have the following format: OldOrders, old-rders, old_orders, no separate words.**
### **!! The field email it's mandatory! This way, the old orders will be printed in the interface. **

**!! If you want to use a Text field with unlimited size, you need to choose from Type: Text**
![md-5](/docs/md-5.png "Enter Entity details")
- You need to check the following boxes for each field from the entity, to make the fields accessible.

![get-fields](/docs/get-fields.png "Make fields accessible")
- You can enter any fields you need 
- **If you need translation in your Store** -> Then your fields will be chosen from this list above that exists in the code :
  
- ID Comanda
- Companie
- Data comenzii
- Oras livrare
- Destinatar
- Nume
- Prenume
- Nr. factura
- Comentarii
- Valoare
- Moneda
- **OR** you can define new ones in code in /messages/context.json, /messages/en.json, /messages/ro.json like this:

![md-6](/docs/md-6.png "Enter Entity fields")
- **If you don't need to translate the Store and you need some extra fields, you can just add them in MasterData**

- Then you need to Publish the new Entity:

![md-8.1](/docs/md-8.1.png "Publish Entity")
![md-8.2](/docs/md-8.2.png "Accept Publish Entity")
- After you create the entity, you go to {yourStoreName}.vtexcrm.com.br -> Profile System
1. In Profile Systems:

- Go to
  
![md-1](/docs/md-1.png "Profile System Settings")
- Then go to Forms and add a New one:

![md-9](/docs/md-9.png "Profile System Settings")
- Select the created entity and choose what fields do you want to keep for the report:

![md-10](/docs/md-10.png "Create new form")
- Then go to Schemas de Layout and add a new section (this is how you will visualize every row from Old Orders):

![md-11](/docs/md-11.png "Add new section")
- Drag and Drop the wanted fields:

![md-12](/docs/md-12.png "Drag and Drop fields")
- You should see this after selecting a row from the Old Orders form

![md-13](/docs/md-13.png "Row preview")

- If you want you can import your csv/excel files with the already existing old orders from your store

![imp-1](/docs/imp-1.png "Import")

![imp-2](/docs/imp-2.png "Add csv")

### Admin Settings Configuration
1. Go to {yourStoreName}.myvtex.com/admin/apps where {yourStoreName} needs to be replaced with your tenant name
2. Click on Uninstalled and search for Old Orders
3. Install Old Orders -> now you will find it in the Installed section
4. Go to Old Orders -> Settings
5. In **Schema fields** add the fields that you would like to see in your Old Orders report, for example:
- order_id
- company_code
- created
- delivery_city
- delivery_address
- delivery_contact_name
- firstname
- lastname
- value_with_tax
- currency
- products
- assembly_message
These are the fields that were previously added by you in MasterData and they can differ from the example.
6. In **Schema url fields** add the fields that you would like to see in your Old Orders report:
-- Field name: email
-- Title of the field: Email
7. **Email Field**: email
8. **Data Entity Name**: OO (this is formed from 2 letters only and it can be different, depending on what name are you giving it in the masterdata)
9. **Data Entity schema Name is always**: mdv1 

## Setup for CRON using V4 Scheduler 

#### Find all schedules CRONS

**Method - GET; Endpoint - http://{{account}}.{{environment}}/api/scheduler/:workspace/:app**

Params:
    Query Params:
    KEY: version ; Value: 4

    Path Variables:
    KEY: workspace; Value: yourWorkspace or master
    KEY: app;       Value: vtex.old-orders

Headers:
    KEY: Content-Type; Value: application/json
    KEY: VtexIdclientAutCookie;   Value: {{VtexIdclientAutCookie}}

#### Create CRON

**Method - POST; Endpoint - http://{{account}}.{{environment}}/api/scheduler/:workspace/:app**

Params:
  Query Params:
  KEY: version ; Value: 4

  Path Variables:
  KEY: workspace; Value: yourWorkspace or master
  KEY: app;       Value: vtex.old-orders

Headers:
  KEY: Content-Type; Value: application/json
  KEY: VtexIdclientAutCookie;   Value: {{VtexIdclientAutCookie}}

{
  "id": "f3115a0d-ac67-4e1d-a549-85b453d7cad1", 
  "scheduler": {
      "expression": "*/5 * * * *",
      "endDate": "2222-03-13T23:59:00"
  },
  "request": {
      "uri": "https://{{replaceWithPublicDNS}}/_v/old-orders/cron?workspace=yourWorkspace",
      "method": "GET",
      "body": {
          "test": "TestPingScheduler"
      }
  }
}

#### Update CRON

**Method - PUT; Endpoint - http://{{account}}.{{environment}}/api/scheduler/:workspace/:app**

Params:
    Query Params:
    KEY: version ; Value: 4

    Path Variables:
    KEY: workspace; Value: yourWorkspace or master
    KEY: app;       Value: vtex.old-orders

Headers:
  KEY: Content-Type; Value: application/json
  KEY: VtexIdclientAutCookie;   Value: {{VtexIdclientAutCookie}}

{
  "id": "f3115a0d-ac67-4e1d-a549-85b453d7cad1", 
  "scheduler": {
      "expression": "*/5 * * * *",
      "endDate": "2222-03-13T23:59:00"
  },
  "request": {
      "uri": "https://{{replaceWithPublicDNS}}/_v/old-orders/cron?workspace=yourWorkspace",
      "method": "GET",
      "body": {
          "test": "TestPingScheduler"
      }
  }
}

#### Delete CRON

**Method - DELETE; Endpoint - http://{{account}}.{{environment}}/api/scheduler/:workspace/:app/:id**

Params:
    Query Params:
    KEY: version ; Value: 4

    Path Variables:
    KEY: workspace; Value: yourWorkspace or master
    KEY: app;       Value: vtex.old-orders
    KEY: id;        Value: f3115a0d-ac67-4e1d-a549-85b453d7cad1 (from your POST Method's BODY)

Headers:
    KEY: Content-Type; Value: application/json
    KEY: VtexIdclientAutCookie;   Value: {{VtexIdclientAutCookie}}
    
### Set CRON Automatically 

* **Method**
  `POST` | `DELETE`


* **URL POST METHOD**
  `http://{{account}}.{{environment}}/_v/old-orders/cron`

* **URL DELETE METHOD**
  `http://{{account}}.{{environment}}/_v/old-orders/cron`


* **Success response**
  * `POST`:
    * Code: `201`
    * Content: `'Cron created'`
  * `DELETE`:
    * Code: `200`
    * Content: `'Cron deleted'`