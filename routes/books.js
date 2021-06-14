const express = require('express')
const router = express.Router()
const conn = require('../config.js');

//tampilkan semua data buku
router.get('/',(req, res) => {
    let sql = "SELECT * FROM books";
    conn.query(sql, (err, results) => {
      if(err) throw err;
      res.json({"success" : "true", "data": results});
    });
  });
   
//tampilkan data buku berdasarkan id
router.get('/:id',(req, res) => {
    let sql = "SELECT * FROM books WHERE id="+req.params.id;
    conn.query(sql, (err, results) => {
        if(err) throw err;
        if(results.length != 0){
            res.json({"success" : "true", "data": results});
        }else{
            res.json({"success" : "false", "message": "Data Buku Tidak Ditemukan"});
        }
    });
});

//tambahkan data buku baru
router.post('/',(req, res) => {
    let data = {title: req.body.title, author: req.body.author,year: req.body.year};
    let sql = "INSERT INTO books SET ?";
    conn.query(sql, data,(err) => {
        if(err) throw err;
        res.json({"success" : "true", "messages" : "Berhasil Menambahkan Data Buku"});
    });
});

//edit data buku berdasarkan id
router.put('/:id',(req, res) => {
    let sql = "UPDATE books SET title='"+req.body.title+"', author='"+req.body.author+"', year='"+req.body.year+"' WHERE id="+req.params.id;
    conn.query(sql, (err) => {
        if(err) throw err;
        res.json({"success" : "true", "messages" : "Data Buku Berhasil Diubah"});
    });
});

//Delete data buku berdasarkan id
router.delete('/:id',(req, res) => {
    let sql = "DELETE FROM books WHERE id="+req.params.id+"";
    conn.query(sql, (err) => {
        if(err) throw err;
        res.json({"success" : "true", "messages" : "Data Buku Berhasil Dihapus"});
    });
});

router.get('/title/:judul', (req, res)=>{
    let sql = "SELECT * FROM books WHERE title LIKE '%"+req.params.judul+"%'";
    conn.query(sql,(err, results)=>{
        if(err) throw err;
        if(results != null){
            res.json({"success" : "true", "data": results});
        }else{
            res.json({"success" : "false", "message": "Data Buku Dengan Judul "+req.params.judul+" Tidak Ditemukan"});
        }
    })
})


router.get('/author/:penulis', (req, res)=>{
    let sql = "SELECT * FROM books WHERE author LIKE '%"+req.params.penulis+"%'";
    conn.query(sql,(err, results)=>{
        if(err) throw err;
        if(results.length != 0){
            res.json({"success" : "true", "data": results});
        }else{
            res.json({"success" : "false", "message": "Data Buku Dengan Author "+req.params.penulis+" Tidak Ditemukan"});
        }
    })
})

router.get('/year/:tahun', (req, res)=>{
    let sql = "SELECT * FROM books WHERE year LIKE '"+req.params.tahun+"'";
    conn.query(sql,(err, results)=>{
        if(err) throw err;
        if(results.length != 0){
            res.json({"success" : "true", "data": results});
        }else{
            res.json({"success" : "false", "message": "Data Buku Dengan Tahun "+req.params.tahun+" Tidak Ditemukan"});
        }
    })
})

module.exports = router;
