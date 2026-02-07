Feature: Flujo de Compra E2E en Sauce Demo

  Background:
    Given el usuario navega a la página principal

  @TC1
  Scenario: Inicio de sesion, visualizacion de catálogo, selección de productos y compra de un carrito
    Given el usuario ingresa con las credenciales correctas del rol "comprador"
    Then ingresa correctamente al sistema
    When el usuario selecciona los siguientes productos del catálogo
      | producto              |
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
      | Sauce Labs Onesie     |
    Then el sistema marca cada producto como agregado al carrito
    And el usuario selecciona la opcion de ver el carrito
    Then el sistema muestra en el carrito todos los productos seleccionados
    When el usuario procede al checkout
    And el usuario ingresa nombre '<nombre>', apellido '<apellido>' y codigo postal '<cp>' para confirmar el pedido
    Then el sistema muestra el resumen del checkout con datos validos
    When el usuario confirma la compra
    Then el sistema muestra la confirmación de la orden

      Examples:
        | nombre  | apellido      | cp   |
        | Test    | ChallengeQA   | 1234 |

  @TC2
  Scenario Outline: Intento de checkout con datos inválidos
    Given el usuario ingresa con las credenciales correctas del rol "comprador"
    Then ingresa correctamente al sistema
    When el usuario selecciona los siguientes productos del catálogo
      | producto              |
      | Sauce Labs Backpack   |
    Then el sistema marca cada producto como agregado al carrito
    And el usuario selecciona la opcion de ver el carrito
    Then el sistema muestra en el carrito todos los productos seleccionados
    When el usuario procede al checkout
    And el usuario ingresa datos de envío inválidos
    Then el sistema indica que la orden no puede ser procesada

      Examples:
        | nombre  | apellido      | cp   |
        | Test    | ChallengeQA   | 1234 |