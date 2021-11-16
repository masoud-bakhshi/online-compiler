const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
// import { v4 as uuidV4 } from "uuid";
// const uuidV4 = require("uuid");
//uuidV4()
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

exports.CplusplusRunner = async (code, input, randText) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const cPlusFile1 = "cplusCode" + randText + ".cpp";
    const cPlusFile2 = "inputCplus" + randText + ".txt";
    const cPlusFile3 = "cplusExe" + randText;

    saveFile(cPlusFile1, code)
      .then(() => {
        fs.writeFile(cPlusFile2, input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        const filePath = path.join(__dirname, "../" + cPlusFile1);
        console.log("cpp file -> " + filePath);

        // exec("sudo g++ " + filePath, (err, stdout, stderr) => {
        exec("g++ -o " + cPlusFile3 + " " + filePath, (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: err,
              error: stderr,
            });
          }

          console.log("compilation done..");
          // exec("sudo ./a.out < " + "inputb.txt", (err, stdout, stderr) => {
          exec(cPlusFile3 + " < " + cPlusFile2, (err, stdout, stderr) => {
            if (err) {
              console.log("ERROR " + err);
              resolve({
                err: true,
                output: err,
                error: stderr,
              });
            }

            console.log("output \n ", stdout);
            resolve({
              err: false,
              output: stdout,
            });
          });
        });
      })
      .catch((e) => {
        console.log("error saving file " + e);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
    // deleteController.deleteFile(path.join(__dirname, "../inputb.txt"));
    // deleteController.deleteFile(path.join(__dirname, "../b.cpp"));
    // deleteController.deleteFile(path.join(__dirname, "../cplus1.exe"));
  });
};
exports.CRunner = async (code, input, randText) => {
  return new Promise((resolve, reject) => {
    const cFile1 = "cCode" + randText + ".c";
    const cFile2 = "inputC" + randText + ".txt";
    const cFile3 = "cExe" + randText;

    // const fileName = "a.c";
    saveFile(cFile1, code)
      .then(() => {
        fs.writeFile(cFile2, input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        const filePath = path.join(__dirname, "../" + cFile1);
        console.log("c file -> " + filePath);

        exec("gcc -o " + cFile3 + " " + filePath, (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: err,
              error: stderr,
            });
          }

          console.log("Compilation done");
          exec(cFile3 + " < " + cFile2, (err, stdout, stderr) => {
            if (err) {
              console.log("error " + err);
              resolve({
                err: true,
                output: err,
                error: stderr,
              });
            }

            console.log("output: \n ", stdout);
            resolve({
              err: false,
              output: stdout,
            });
          });
        });
      })
      .catch(() => {
        console.log("error while saving the file \n" + saveFileRes);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};
exports.PythonRunner = async (code, input, randText) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    const pythonFile1 = "pythonCode" + randText + ".py";
    const pythonFile2 = "inputPython" + randText + ".txt";

    // const fileName = "c.py";
    saveFile(pythonFile1, code)
      .then(() => {
        fs.writeFile(pythonFile2, input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        const filePath = path.join(__dirname, "../" + pythonFile1);
        console.log("python file -> " + filePath);
        const inputPath = path.join(__dirname, "../" + pythonFile2);
        exec(
          "python " + filePath + " < " + inputPath,
          (err, stdout, stderr) => {
            if (err) {
              console.error(`exec error: ${err}`);
              resolve({
                err: true,
                output: err,
                error: stderr,
              });
            }
            resolve({
              err: false,
              output: stdout,
            });
          }
        );
      })
      .catch(() => {
        console.log("error saving python file \n" + saveFileRes);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};

//******************************************** */
exports.JavaRunner = async (code, input, randText) => {
  const res = {
    err: false,
    msg: "",
  };
  return new Promise((resolve, reject) => {
    // const fileName = "test.java";
    const javaFile1 = "javaCode" + randText + ".java";
    const javaFile2 = "inputJava" + randText + ".txt";
    // const javaFile3 = "javaClass" + randText;
    const javaFile3 = ("javaClass" + randText).split("-").join("");
    // const mainCode = code.replace("test", javaFile3.replace("-", ""));
    const mainCode = code.replace("test", javaFile3.split("-").join(""));
    // console.log(mainCode);
    // const javaFile3 = "test";

    // console.log(code);
    // let position = code.indexOf("class") + 5;
    // console.log(position);
    // const subCode1 = code.slice(position + 1).split(" ")[0];
    // console.log(subCode1);
    // // let position2 = code.indexOf(subCod) + 5;
    // const subCode2 = code.slice(code.indexOf(subCode1) + subCode1.length + 1);
    // console.log(subCode2);
    // const mainCode = code.slice(0, position) + " Masoud " + subCode2;
    // console.log(mainCode);

    saveFile(javaFile1, mainCode)
      .then(() => {
        fs.writeFile(javaFile2, input, function (err) {
          if (err) {
            console.log(err);
            reject();
          }
        });

        const filePath = path.join(__dirname, "../" + javaFile1);
        console.log("javac file -> " + filePath);

        // exec("sudo g++ " + filePath, (err, stdout, stderr) => {
        exec("javac " + filePath, (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            resolve({
              err: true,
              output: err,
              error: stderr,
            });
          }

          console.log("compilation done..");
          // exec("sudo ./a.out < " + "inputb.txt", (err, stdout, stderr) => {
          // exec("java < " + "inputb.txt", (err, stdout, stderr) => {
          exec(
            "java " + javaFile3 + " < " + javaFile2,
            (err, stdout, stderr) => {
              if (err) {
                console.log("ERROR " + err);
                resolve({
                  err: true,
                  output: err,
                  error: stderr,
                });
              }

              console.log("output \n ", stdout);
              resolve({
                err: false,
                output: stdout,
              });
            }
          );
        });
      })
      .catch((e) => {
        console.log("error saving file " + e);
        const err = {
          err: true,
          output: "Internal Server Error!",
        };
        resolve(err);
      });
  });
};
//****************************************************** */
const saveFile = async (name, data) => {
  return new Promise((resolve, reject) => {
    console.log("saving ...");
    fs.writeFile(name, data || null, function (err) {
      if (err) {
        console.log(err);
        reject();
      } else {
        console.log("file saved");
        resolve();
      }
    });
  });
};
