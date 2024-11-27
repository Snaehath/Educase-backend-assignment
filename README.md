# Educase Back-end Assignment

### Database Setup:

1. Create a `MySQL` Database and set up a database named as required.
2. Create a `table` named using required schema.
3. Create `.env` file in the root directory with variable `DB_HOST`,`DB_USERNAME`,`DB_PASSWORD`,`DB_DBNAME` assigned to the `sql server`.
4. Make sure to select the `Node.JS` driver with the version `4.1 or later`

#### `Note`: Your `.env` file should look something like this (kindly refer to `Database Setup`for fill these variables)

```
DB_HOST =
DB_USERNAME =
DB_PASSWORD =
DB_DBNAME =
```

## Usage:

```
1. git clone https://github.com/Snaehath/Educase-backend-assignment.git
2. cd Educase-backend-assignment
3. npm / yarn install
4. npm / yarn start (in production)
5a. npm / yarn run dev-win (in development for Windows)
5b. npm / yarn run dev-mac (in development for MacOS / Linux)
```

## API Endpoints

The following endpoints are available in this application:

### 1. Add School

- **Endpoint**: `/schoolDB/addSchool`
- **Method**: `POST`
- **Description**: Add school details to database.

### 2. Get All Schools

- **Endpoint**: `/schoolDB/listSchools/latitude,longitude`
- **Method**: `GET`
- **Description**: Fetches a list of all schools and sorts them based on proximity to the user's location, and returns the sorted list.
