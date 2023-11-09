//관리자 페이지(상품 목록 조회) js
const userContainer = document.getElementById('userContainer');

//페이지가 로드되었을 때 관리자인지 확인 후  fetch
window.addEventListener('load', async () => { 
  const token = localStorage.getItem('Token');
  if(!isAdmin(token)){
    location.href = '/notAdmin';
  }else{
    try {
      const fetchResult = await fetchCustom('/api/v1/admin/products','GET',token);
      const fetchData = await fetchResult.json();

      if(fetchResult.status === 200){
        console.log('상품 조회 성공');
        const productSeq = fetchData.data.sort((a, b) => {
            if(a.createdAt < b.createdAt) return 1;
            if(a.createdAt === b.createdAt) return 0;
            if(a.createdAt > b.createdAt) return -1;
        });
        productList(productSeq);
      }else if(fetchResult.status === 403){
        console.log('권한이 없습니다');
      }
    } catch (error) {
      console.log('err: ', error);
    }
  }
})

const productList = (data) => {
  userContainer.innerHTML = "";
  userContainer.innerHTML += `
    <tr class="userTableHeader">
      <th class='index'>index</th>
      <th class='bookId'>Id</th>
      <th class='bookname'>bookname</th>
      <th class='author'>author</th>
      <th class='category'>category</th>
      <th class='price'>price</th>
      <th class='releasedDate'>releasedDate</th>
      <th class='createdAt'>createdAt</th>
    </tr>
  `
  for(i = 0; i < data.length; i ++) {
    const releasedDate = data[i].releasedDate.split("T");
    const createdAt = data[i].createdAt.split("T");
    userContainer.innerHTML += `
      <tr id='${i}' class='userTableBody'> 
        <td class='indexValue'>${i+1}</td>
        <td class='bookIdValue'>${data[i]._id}</td>
        <td class='booknameValue'>${data[i].name}</td>
        <td class='authorValue'>${data[i].author}</td>
        <td class='categoryValue'>${data[i].categoryName}</td>
        <td class='priceValue'>${data[i].price}</td>
        <td class='releasedDateValue'>${releasedDate[0]}</td>
        <td class='createdAtValue'>${createdAt[0]}</td>
      </tr>
    `
  }
}