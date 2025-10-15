function addHeaderButtons() {
  const $wrap = document.querySelector("ul.icons.d-header-icons");
  if ($wrap) {
    console.log("$wrap found");
    const $li = document.createElement("li");
    $li.className = "search-dropdown custom-header-icon-link";

    const $a = document.createElement("a");
    $a.className = "btn no-text btn-icon icon btn-flat";
    $a.href = "https://linux.do/u/gallen/activity/likes-given";
    $a.title = "我的点赞";
    $a.setAttribute("type", "button");

    jQuery($a).append(
      '<svg class="fa d-icon d-icon-heart svg-icon svg-string" xmlns="http://www.w3.org/2000/svg"><use href="#heart"></use></svg>'
    );

    $li.appendChild($a);

    jQuery($wrap).prepend($li);
  } else {
    console.error("$wrap not found");
  }
}

function makeOpenInNewTab() {
  console.log("makeOpenInNewTab");

  // 检查当前条件
  function isTargetPage() {
    const path = window.location.pathname;
    return (
      path === "/" ||
      path === "/search" ||
      (path.startsWith("/u/") && path.endsWith("/activity/bookmarks")) ||
      (path.startsWith("/u/") && path.includes("/activity/topics"))
    );
  }

  // 主函数，用于修改链接
  function modifyLinks() {
    // 如果不是目标页面，则不执行任何操作
    if (!isTargetPage()) {
      return;
    }

    // 选择所有帖子链接 - 更精确的选择器
    const postLinks = document.querySelectorAll("a[data-topic-id]") as NodeListOf<HTMLAnchorElement>;

    // 遍历所有链接并添加 target="_blank" 属性
    postLinks.forEach(link => {
      // 检查链接是否包含帖子 URL 模式
      if (link.href && (link.href.includes("/t/") || link.href.includes("/d/"))) {
        if (!link.hasAttribute("target") || link.getAttribute("target") !== "_blank") {
          link.setAttribute("target", "_blank");

          // 添加 rel="noopener" 以提高安全性
          if (!link.hasAttribute("rel") || !link.getAttribute("rel")?.includes("noopener")) {
            const currentRel = link.getAttribute("rel") || "";
            link.setAttribute("rel", currentRel ? currentRel + " noopener" : "noopener");
          }

          // 防止点击事件被其他处理程序拦截
          link.addEventListener(
            "click",
            function (e) {
              // 阻止默认行为和事件冒泡
              e.stopPropagation();
            },
            true
          );
        }
      }
    });
  }

  modifyLinks();
}

window.addEventListener("load", () => {
  addHeaderButtons();
  makeOpenInNewTab();
});

// 也在 DOMContentLoaded 时执行一次
document.addEventListener("DOMContentLoaded", makeOpenInNewTab);
