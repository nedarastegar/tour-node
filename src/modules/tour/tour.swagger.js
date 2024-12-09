/**
 * @swagger
 * tags:
 *  name: Tour
 *  description: Tour Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SearchTour:
 *              type: object
 *              required:
 *                  -   nameTour
 *                  -   origin
 *                  -   destination
 *                  -   departureDate
 *                  -   Returndate
 *                  -   booked
*                   -   Seatsavalable
 *              properties:
 *                  nameTour:
 *                      type: string
 *                  origin:
 *                      type: string
 *                  destination:
 *                      type: string
 *                  departureDate:
 *                      type: Date
 *                  Returndate:
 *                      type: Date
 *                  price:
 *                      type: number
 *                  booked:
 *                      type: number
 *                  Seatsavalable:
 *                      type: number
 *                  Transportation:
 *                      type: string
 *          FindTour: 
 *              type: object
 *              required:
 *                  -   origin
 *                  -   destination
 *              properties:
 *                  origin:
 *                      type: string
 *                  destination:
 *                      type: string
 */

/**
 * @swagger
 * /tour/create:
 *  post:
 *      summary: search tour
 *      tags:
 *          -   Tour
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/SearchTour'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SearchTour'
 *      responses:
 *          201: 
 *              description: create-tour
 */
/**
 * @swagger
 * /tour/find:
 *  get:
 *      summary: get all tours
 *      tags:
 *          -   Tour
 *      responses:
 *          200: 
 *              description: successfully
 */
/**
 * @swagger
 * /tour/search:
 *  post:
 *      summary: get tour by search
 *      tags:
 *          -   Tour
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/FindTour'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FindTour'
 *      responses:
 *          201: 
 *              description: search-tour
 */
/**
 * @swagger
* /tour/{id}:
*  delete:
*      summary: delete tour
*      tags:
*          -   Tour
*      parameters:
*          -   in: path
*              name: id
*      responses:
*          200: 
*              description: successfully
*/
/**
 * @swagger
 * /tour/{id}:
 *  put:
 *      summary: updated tour
 *      tags:
 *          -   Tour
 *      parameters:
 *          -   in: path
 *              name: id
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/SearchTour'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SearchTour'
 *      responses:
 *          201: 
 *              description: created
 */