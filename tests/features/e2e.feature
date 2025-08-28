Feature: login 
  Scenario: Successfully checkedout an order with valid credentials
    Given I access the login page
    When I input username and password
    And i can see the products page
    And I add items to the cart
    And I remove an item from the cart
    And I proceed to checkout
    And I log out from the application
    Then I should be logged out successfully