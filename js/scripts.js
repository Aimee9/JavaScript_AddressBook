/**
 * CONTACT
 */

function Contact(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.addresses = [];
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

/**
 * ADDRESS
 */

function Address(street, city, state, category) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.category = category;
}

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state + ", " + this.category;
}

/**
 * FORM HELPER FUNCTIONS
 */

function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
  $("input.new-category").val("");
}

function resetNumOfAddresses() {
  $("div.new-address").not("div.new-address:nth-child(1)").remove();
}

$(document).ready(function() {
  // When a add address button is clicked, new address form fields slide down
  $("#add-address").click(function() {
    var newAddress = $('<div class="new-address" style="display:none">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-category">Category</label>' +
                                   '<input type="text" class="form-control new-category">' +
                                 '</div>' +
                               '</div>').hide();
    $("#new-addresses").append(newAddress);
    newAddress.slideDown(2000);
  });



  $("form#new-contact").submit(function(event) {
  event.preventDefault();

  var inputtedFirstName = $("input#new-first-name").val();
  var inputtedLastName = $("input#new-last-name").val();

  var newContact = new Contact(inputtedFirstName, inputtedLastName);

  $(".new-address").each(function() {
    var inputtedStreet = $(this).find("input.new-street").val();
    var inputtedCity = $(this).find("input.new-city").val();
    var inputtedState = $(this).find("input.new-state").val();
    var inputtedCategory = $(this).find("input.new-category").val();

    var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedCategory);
    newContact.addresses.push(newAddress);
  });


  $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

  // Hover even handler
  $("li").hover(
    function() {
      $(this).css("font-weight", "bold");
    }, function() {
      $(this).css("font-weight", "normal");
    }
  );

  $(".contact").last().click(function() {
    $("#show-contact").show();

    $("#show-contact h2").text(newContact.firstName);
    $(".first-name").text(newContact.firstName);
    $(".last-name").text(newContact.lastName);

    $("ul#addresses").text("");
    newContact.addresses.forEach(function(address) {
      $("ul#addresses").append("<li>" + address.fullAddress()  + "</li>");
    });
  });

  resetFields();
  resetNumOfAddresses();
}); // end of new-contact submit

}); // end of document
