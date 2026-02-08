Feature: Integración E2E con Fake Store API - Flujo de usuario + carrito

  Background:
    Given existe una lista de usuarios disponibles
    And se elige un usuario al azar

    Scenario: Flujo completo de autenticación y carrito con productos
      When se inicia sesión con las credenciales del usuario elegido
      Then el sistema confirma el inicio de sesión exitoso
      When el usuario consulta la lista de productos disponibles del catalogo
      And elige 3 productos aleatorios de la lista y consulta el detalle de cada uno
      Then el sistema muestra el detalle de cada uno de los productos
      When el usuario agrega los productos seleccionados a un nuevo carrito
      Then el carrito se crea correctamente con los productos
      When un administrador actualiza el precio de uno de los productos en el carrito
      Then el precio actualizado se refleja en el carrito
      When el usuario elimina el carrito creado
      Then el sistema confirma la eliminacion del carrito