/**
 * Load directoryies and files
 * 
 * @param {*} directoryId The directory name
 * @returns Directories and files data
 * @example
  ```json
  {
    "id": "directory-1",
    "entries": [
       {
         "name": "directory-1a",
         "type": "directory"
       }
    ]
  }
  ```
  or
  ```json
  {
    "id": "directory-1/directory-1a",
    "entries": [
        {
        "name": "directory-1aA",
        "type": "directory"
        },
        {
        "name": "index.js",
        "type": "file"
        }
    ]
  }
  ```
 */
export async function loadDirectory(directoryId) {
    const resp = await fetch(`${global.config.FILE_SERVER_URL}/fs?path=${directoryId}`);
    return resp.json()
}

/**
 * Load file content
 * 
 * @param {*} fileName File name needs to load
 * @returns The content of file
 * @example
 * ```json
 * {
 *    "id": "index.js",
 *    "contents": "() => {console.log('index.js'}"
 * }
 * ```
 */
export async function loadFileContent(fileName) {
    const resp = await fetch(`${global.config.FILE_SERVER_URL}/fs?path=${fileName}`);
    return resp.json()
}
