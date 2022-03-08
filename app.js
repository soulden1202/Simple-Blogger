window.onload = () => {
  getApi();
};

const getApi = async () => {
  let url = "https://jsonplaceholder.typicode.com/posts/";
  let res = await fetch(url);
  let data = await res.json();

  test(data);
};

const test = async (data) => {
  const maincontainer = document.querySelector("#maincontainer");

  $(".collapsible").collapsible();

  data.forEach((datas) => {
    //list contain
    const container = document.createElement("li");

    var a = document.createAttribute("data-role");
    a.value = "collapsible";
    container.setAttributeNode(a);

    //header
    const header = document.createElement("div");
    header.classList.add("collapsible-header");
    header.classList.add("valign-wrapper");

    //div for icon and userid
    const div1_header = document.createElement("div");
    div1_header.classList.add("down_line");
    div1_header.classList.add("left-align");
    div1_header.classList.add("left");
    div1_header.classList.add("right");

    //div for title
    const div2_header = document.createElement("div");
    div2_header.classList.add("right-align");

    //icon
    const icon = document.createElement("i");
    icon.classList.add("material-icons");
    icon.innerHTML = "person";

    //user
    const user = document.createElement("span");
    user.innerHTML = "Anonymous";
    user.classList.add("hide-on-med-and-down");

    //tilte
    const title = document.createElement("b");
    title.classList.add("truncate");
    title.innerHTML = "Title: " + datas.title;

    //body
    const body = document.createElement("div");
    body.classList.add("collapsible-body");

    const div1_body = document.createElement("div");
    div1_body.classList.add("hide-on-large-only");

    const div2_body = document.createElement("div");
    div2_body.classList.add("hide-on-large-only");

    //iconbody
    const icon1 = document.createElement("i");
    icon1.classList.add("material-icons");
    icon1.innerHTML = "person";
    icon1.classList.add("hide-on-large-only");

    //userbody
    const user1 = document.createElement("span");
    user1.innerHTML = "Anonymous";
    user1.classList.add("hide-on-large-only");

    //tiltebody
    const title1 = document.createElement("b");
    title1.classList.add("truncate");
    title1.innerHTML = "Title: " + datas.title;
    title1.classList.add("hide-on-large-only");

    const text = document.createElement("span");

    //bodytext
    text.innerHTML = datas.body;

    //div betwwen
    const divbetween = document.createElement("div");
    divbetween.classList.add("seperation");

    //modals
    let maindiv = document.getElementById("maindiv");
    let modalcontainer = document.createElement("div");
    modalcontainer.setAttribute("id", "modal" + datas.id);
    modalcontainer.classList.add("modal");

    let modal_content = document.createElement("div");

    modal_content.classList.add("modal-content");

    let modal_header = document.createElement("h4");
    modal_header.innerHTML = "Comments";

    let modal_body = document.createElement("div");
    modal_body.setAttribute("id", "comments" + datas.id);

    let postid =
      "https://jsonplaceholder.typicode.com/comments?postId=" + datas.id;
    getComments(postid);

    modal_content.append(modal_header);
    modal_content.append(modal_body);

    modalcontainer.append(modal_content);

    maindiv.append(modalcontainer);
    $(".modal").modal();

    let modalbutton_container = document.createElement("div");
    modalbutton_container.classList.add("marin-button");

    const modalbutton = document.createElement("a");
    modalbutton.classList.add(
      "waves-effect",
      "waves-light",
      "btn",
      "modal-trigger"
    );

    modalbutton.innerHTML = "comments";

    modalbutton.href = "#modal" + datas.id;

    const modalatribute = document.createAttribute("id");
    modalatribute.value = datas.id;

    modalbutton_container.append(modalbutton);
    //get comments

    //apend elements

    div1_header.append(icon);
    div1_header.append(user);
    div2_header.append(title);

    div1_body.append(icon1);
    div1_body.append(user1);
    div2_body.append(title1);

    header.append(div1_header);
    header.append(div2_header);
    header.append(title);

    body.append(div2_body);
    body.append(div1_body);
    body.append(text);

    body.append(modalbutton_container);

    container.append(header);
    container.append(body);

    maincontainer.append(container);
    container.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".collapsible");
      var instances = M.Collapsible.init(elems);

      modalbutton.addEventListener("DOMContentLoaded", function () {
        var elems = document.querySelectorAll(".modal");
        var instances = M.Modal.init(elems);
      });
    });
    maincontainer.append(divbetween);
  });
};

const getComments = async (datas) => {
  let url1 = datas;
  let res1 = await fetch(url1);
  let data1 = await res1.json();

  data1.forEach((data1s) => {
    let modal_container = document.getElementById("comments" + data1s.postId);

    let ul_comment = document.createElement("ul");
    ul_comment.classList.add("collection");

    let comment_container = document.createElement("li");
    comment_container.classList.add("collection-item", "avatar");

    let usericon = document.createElement("i");
    usericon.classList.add("material-icons", "circle");
    usericon.innerHTML = "person";

    let comment_user = document.createElement("span");
    comment_user.classList.add("title");
    comment_user.innerHTML = data1s.name;

    let comment_body = document.createElement("p");
    comment_body.innerHTML = data1s.body;

    comment_container.append(usericon);
    comment_container.append(comment_user);
    comment_container.append(comment_body);
    ul_comment.append(comment_container);
    modal_container.append(ul_comment);
  });

  return data1;
};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
