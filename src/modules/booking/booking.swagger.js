/**
 * @swagger
 * tags:
 *  name: Booking
 *  description: Booking Module and Routes
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          creatBooking:
 *              type: object
 *              required:
 *                  -   capacity
 *              properties:
 *                  capacity:
 *                      type: number
 *                  reservationDate:
 *                      type: Date
 *                  status:
 *                      type: number
 *                  paymentStatus:
 *                      type: Boolean
 */
/**
 * @swagger
 * /booking/book/{tourId}:
 *  post:
 *      summary: reserve
 *      tags:
 *          -   Booking
 *      parameters:
 *          -   in: path
 *              name: tourId
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/creatBooking'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/creatBooking'
 *      responses:
 *          201: 
 *              description: create-booking
 */
/**
 * @swagger
 * /booking/find:
 *  get:
 *      summary: get all booking
 *      tags:
 *          -   Booking
 *      responses:
 *          200: 
 *              description: successfully
 */
