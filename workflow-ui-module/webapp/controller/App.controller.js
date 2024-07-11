sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
  ],
  function (BaseController,JSONModel,ColumnListItem,TextArea) {
    "use strict";
    var checkeditem;
    var oModel;
    var oModel1;
    var oData;
    var oTable1;
    var oTable2;
    var oTable;
    return BaseController.extend("paymentNamespace.workflowuimodule.controller.App", {
      onInit() {

      },
      onBeforeRendering: async function (oEvent) {
        debugger
        //   $.ajax({
        //     url: 'https://b2a369b5trial-dev-invoiceform-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/',
        //     type: 'GET',
        //     contentType: 'application/json',
        //     data: testdata, 
        //     success: function(data) {
        //         debugger
        //         // Handle success
        //         console.log(data);
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         // Handle error
        //         console.error(textStatus, errorThrown);
        //     }
        // })
        var poNum = this.getOwnerComponent().oModels.context.oData.po_number;
        var rid = this.getOwnerComponent().oModels.context.oData.registration_id;


        await $.ajax({
          url: `https://b2a369b5trial-dev-invoiceform-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/poheader?$filter=po_number eq '${poNum}' and registration_id eq '${rid}'&$expand=po_to_item,po_to_checkeditem,po_to_invoice,po_to_file,po_to_comment`,
          type: "GET",
          success: function (data) {
            oData = data;
            console.log('data', data);
            debugger
          },
          error: function (error) {
            console.log(`Error ${error}`);
            debugger
          }
        });

        this.byId("input-1").setValue(oData.value[0].po_number);
        this.byId("input-b").setValue(oData.value[0].contract_number);
        this.byId("input-c").setValue(oData.value[0].vendor_name);
        this.byId("input-d").setValue(oData.value[0].vendor_gstin);
        this.byId("input-e").setValue(oData.value[0].vendor_code);
        this.byId("input-f").setValue(oData.value[0].approver_mail);
        this.byId("advanceno").setValue(oData.value[0].po_to_invoice.advance_payment_no);
        this.byId("advancevalue").setValue(oData.value[0].po_to_invoice.advance_payment_value);
        this.byId("advancedate").setValue(oData.value[0].po_to_invoice.advance_payment_date);
        // this.byId("advancevalue").setValue(oData.value[0].po_to_invoiceadvance_payment_value);
        oData.value[0].po_to_invoice.advance_payment_value
        var polineitem = oData.value[0].po_to_item;
        var checkeditem = oData.value[0].po_to_checkeditem;
        var filesitem = oData.value[0].po_to_file;
       
       




        // Create a JSON model and set the data
        oModel = new sap.ui.model.json.JSONModel();
        oModel.setData({ table: polineitem });
        var oTable = this.byId("table");
        oTable.setModel(oModel);
        oTable.bindAggregation("items", {
          path: "/table",
          template: new sap.m.ColumnListItem({
            cells: [
              new sap.m.Text({ text: "{itemno}" }),
              new sap.m.Text({ text: "{item_desc}" }),
              new sap.m.Text({ text: "{item_desc_cond}" }),
              new sap.m.Text({ text: "{plant}" }),
              new sap.m.Text({ text: "{unit_price}" }),
              new sap.m.Text({ text: "{quantity}" }),
              new sap.m.Text({ text: "{cgst_percentage}" }),
              new sap.m.Text({ text: "{sgst_percentage}" }),
              new sap.m.Text({ text: "{cgst_value_static}" }),
              new sap.m.Text({ text: "{sgst_value_static}" }),
            ]
          })
        });

        // oModel = new sap.ui.model.json.JSONModel();
        // oModel.setData({ table: checkeditem });
        // oTable = this.byId("helo");
        // oTable.setModel(oModel);
        // oTable.bindAggregation("items", {
        //   path: "/helo",
        //   template: new sap.m.ColumnListItem({
        //     cells: [
        //       new sap.m.Text({ text: "{itemno1}" }),
        //       new sap.m.Text({ text: "{item_desc1}" }),
        //       new sap.m.Text({ text: "{item_desc_cond1}" }),
        //       new sap.m.Text({ text: "{plant1}" }),
        //       new sap.m.Text({ text: "{unit_price1}" }),
        //       new sap.m.Text({ text: "{quantity1}" }),
        //       new sap.m.Text({ text: "{cgst_percentage1}" }),
        //       new sap.m.Text({ text: "{sgst_percentage1}" }),
        //       new sap.m.Text({ text: "{cgst_value1}" }),
        //       new sap.m.Text({ text: "{sgst_value1}" }),
        //       new sap.m.Text({ text: "{amount1}" }),
        //     ]
        //   })
        // });


        oTable1 = this.byId("helo");
        var oColumn1 = new sap.m.Column({ header: new sap.m.Text({ text: "Item No" }),styleClass:"colClass" })
        var oColumn2 = new sap.m.Column({ header: new sap.m.Text({ text: "Item Description" }),styleClass:"colClass" });
        var oColumn3 = new sap.m.Column({ header: new sap.m.Text({ text: "Item Description Condition" }),styleClass:"colClass" });
        var oColumn4 = new sap.m.Column({ header: new sap.m.Text({ text: "Plant" }),styleClass:"colClass" });
        var oColumn5 = new sap.m.Column({ header: new sap.m.Text({ text: "Unit Price" }),styleClass:"colClass" });
        var oColumn6 = new sap.m.Column({ header: new sap.m.Text({ text: "Quantity" }) ,styleClass:"colClass"});
        var oColumn7 = new sap.m.Column({ header: new sap.m.Text({ text: "CGST %" }) ,styleClass:"colClass"});
        var oColumn8 = new sap.m.Column({ header: new sap.m.Text({ text: "SGST %" }),styleClass:"colClass" });
        var oColumn9 = new sap.m.Column({ header: new sap.m.Text({ text: "CGST Value" }) ,styleClass:"colClass"});
        var oColumn10 = new sap.m.Column({ header: new sap.m.Text({ text: "SGST Value" }) ,styleClass:"colClass"});
        var oColumn11 = new sap.m.Column({ header: new sap.m.Text({ text: "Amount" }) ,styleClass:"colClass"});
        oTable1.addColumn(oColumn1);
        oTable1.addColumn(oColumn2);
        oTable1.addColumn(oColumn3);
        oTable1.addColumn(oColumn4);
        oTable1.addColumn(oColumn5);
        oTable1.addColumn(oColumn6);
        oTable1.addColumn(oColumn7);
        oTable1.addColumn(oColumn8);
        oTable1.addColumn(oColumn9);
        oTable1.addColumn(oColumn10);
        oTable1.addColumn(oColumn11);

        // Iterate over the data for this level and add table rows
        checkeditem.forEach(function (item) {
          var oRow = new sap.m.ColumnListItem();
          oRow.addCell(new sap.m.Text({ text: item.itemno1 }));
          oRow.addCell(new sap.m.Text({ text: item.item_desc1 }));
          oRow.addCell(new sap.m.Text({ text: item.item_desc_cond1 }));
          oRow.addCell(new sap.m.Text({ text: item.plant1 }));
          oRow.addCell(new sap.m.Text({ text: item.unit_price1 }));
          oRow.addCell(new sap.m.Text({ text: item.quantity1 }));
          oRow.addCell(new sap.m.Text({ text: item.cgst_percentage1 }));
          oRow.addCell(new sap.m.Text({ text: item.sgst_percentage1 }));
          oRow.addCell(new sap.m.Text({ text: item.cgst_value1 }));
          oRow.addCell(new sap.m.Text({ text: item.sgst_value1 }));
          oRow.addCell(new sap.m.Text({ text: item.amount1 }));

          oTable1.addItem(oRow);

        });



        oTable2 = this.byId("filesTable");
        var oColumn1 = new sap.m.Column({ header: new sap.m.Text({ text: "File Name" }),styleClass:"colClass" })
        oTable2.addColumn(oColumn1);
        filesitem.forEach(function (item) {
          var oRow = new sap.m.ColumnListItem();
          oRow.addCell(new sap.m.Link({ text:item.fileName, href:item.url, target: "_blank",
          press: function(oEvent)
        {
          debugger
          // var sLinkText = oEvent.getSource().getText();
          // sap.m.MessageToast.show("Link pressed: " + sLinkText);
        }
        }));
          oTable2.addItem(oRow);

        });

      

      },





      onComment: async function (oEvent) {
        debugger
        var commentsitem = oData.value[0].po_to_comment;
        var cdialog = new sap.m.Dialog({
          title: "Comments",
          endButton: new sap.m.Button({
            text: "Close",
            press: async function () {
              cdialog.close();
            },
            layoutData: new sap.m.FlexItemData({
              // Add layoutData for flexible item behavior
              growFactor: 5,
              alignSelf: "End" // Align the button to the end (right)
            })
          })
        });
        cdialog.addContent(new sap.m.VBox({
          width: "60vw"
        }));

        function generateUniqueId() {
          // Generate a random number
          var randomNumber = Math.floor(Math.random() * 1000000);

          // Get the current timestamp
          var timestamp = new Date().getTime();

          // Combine timestamp and random number to create a unique ID
          var uniqueId = timestamp + '-' + randomNumber;

          return uniqueId;
        }
        debugger
        // var path = window.location.href;
        // const parts = path.split("'");

        // // Find the index of the substring "reimbursmentId="
        // const index = parts.findIndex(part => part.includes("registration_id="));
        // const number = parts[index + 1];
        // var funcname = "getcallcomment";
        // let oFunc = this.getModel().bindContext(`/${funcname}(...)`);
        // oFunc.setParameter('registration_id', number);
        // await oFunc.execute();
        // let context = oFunc.getBoundContext();
        // let getdata = context.getValue();
        // let result = getdata.value;
        // result = JSON.parse(result);
        // var i1 = result.length;
        // // var len = commentshistory.length;
        for (var i = 0; i < commentsitem.length; i++) {
        var oTimelineItem = new sap.suite.ui.commons.TimelineItem(("thisuniqid1" + generateUniqueId()), {
          dateTime: "12/3/24",
          // title: "demo title1",
          userNameClickable: false,
          // userNameClicked: "onUserNameClick",
          // select: "onPressItems",
          userPicture: "Photo",
          text: commentsitem[i].textArea,
          // userName: "Comments"

        });
        cdialog.addContent(oTimelineItem);
        }


        cdialog.open(); // Open the dialog

      }



    });


  }
);
