const { chromium } = require('playwright');

async function runLoginTest() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('ログインページに移動中...');
    await page.goto('http://localhost:3000/login');
    
    // ページの読み込みを待機
    await page.waitForLoadState('networkidle');
    
    console.log('ユーザー名を入力中...');
    // ユーザー名フィールドを検索して入力
    const usernameField = page.locator('input[name="username"], input[type="text"], input[id*="user"], input[placeholder*="ユーザー"], input[placeholder*="user"]').first();
    await usernameField.fill('fumi_042');
    
    console.log('パスワードを入力中...');
    // パスワードフィールドを検索して入力
    const passwordField = page.locator('input[type="password"], input[name="password"], input[id*="password"], input[placeholder*="パスワード"], input[placeholder*="password"]').first();
    await passwordField.fill('yoshifumi01');
    
    console.log('ログインボタンをクリック中...');
    // ログインボタンを検索してクリック
    const loginButton = page.locator('button[type="submit"], button:has-text("ログイン"), button:has-text("Login"), input[type="submit"]').first();
    await loginButton.click();
    
    // ログイン後のページ遷移を待機
    await page.waitForTimeout(3000);
    
    // 現在のURLを確認
    const currentUrl = page.url();
    console.log('現在のURL:', currentUrl);
    
    // ログイン成功の確認（URLの変化や成功メッセージの有無）
    if (currentUrl !== 'http://localhost:3000/login') {
      console.log('✅ ログイン成功: URLが変化しました');
    } else {
      console.log('❌ ログイン失敗: URLが変化していません');
    }
    
    // ページのスクリーンショットを撮影
    await page.screenshot({ path: 'screenshots/login-result.png' });
    console.log('スクリーンショットを保存しました: screenshots/login-result.png');
    
    // ページのタイトルを確認
    const title = await page.title();
    console.log('ページタイトル:', title);
    
  } catch (error) {
    console.error('エラーが発生しました:', error);
    await page.screenshot({ path: 'screenshots/login-error.png' });
  } finally {
    await browser.close();
  }
}

runLoginTest(); 